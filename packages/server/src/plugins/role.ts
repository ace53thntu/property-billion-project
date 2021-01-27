import Hapi from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import { Repository, getRepository } from "typeorm";
import { RoleEntity } from "../entities/Role";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_UNIQUE_VIOLATION } from "../utils/pgCode";
import { logCreate } from "../policies/auditLog";

const rolesPlugin: Hapi.Plugin<null> = {
  name: "@app/roles",
  dependencies: ["@app/db", "@app/auth"],
  register: async function (server: Hapi.Server) {
    server.route([
      // Create role
      {
        method: "POST",
        path: "/roles",
        handler: createRoleHandler,
        options: {
          validate: {
            payload: createRoleValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
          plugins: {
            policies: [logCreate("role")],
          },
        },
      },
      // Get roles
      {
        method: "GET",
        path: "/roles",
        handler: getRolesHandler,
        options: {
          validate: {
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Get role
      {
        method: "GET",
        path: "/roles/{roleId}",
        handler: getRoleByIdHandler,
        options: {
          validate: {
            params: Joi.object({
              roleId: Joi.number().integer(),
            }),
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Update role
      {
        method: "PUT",
        path: "/roles/{roleId}",
        handler: updateRoleHandler,
        options: {
          validate: {
            params: Joi.object({
              roleId: Joi.number().integer(),
            }),
            payload: updateRoleValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Delete role
      {
        method: "DELETE",
        path: "/roles/{roleId}",
        handler: deleteRoleHandler,
        options: {
          validate: {
            params: Joi.object({
              roleId: Joi.number().integer(),
            }),
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
    ]);
  },
};

export default rolesPlugin;

interface RoleInput {
  name: string;
  description?: string;
}

const roleInputValidator = Joi.object({
  name: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.required(),
  }),
  description: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
});

const createRoleValidator = roleInputValidator.tailor("create");
const updateRoleValidator = roleInputValidator.tailor("update");

/**
 * Create a role handler
 */
async function createRoleHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const roleEntityRepo: Repository<RoleEntity> = getRepository(RoleEntity);
  const payload = request.payload as RoleInput;
  let createdRole;
  try {
    const result = await roleEntityRepo
      .createQueryBuilder()
      .insert()
      .values({
        name: payload.name,
        description: payload.description,
      })
      .returning("*")
      .execute();

    createdRole = result.raw[0];

    return h.response(createdRole).code(201);
  } catch (error) {
    request.log(["error", "role"], error);
    if (isQueryFailedError(error) && error?.code === PG_UNIQUE_VIOLATION) {
      return Boom.badRequest(`Role "name" already exists.`);
    }
    return Boom.badImplementation("Failed to create role.");
  }
}

/**
 * Get roles handler
 * @param request
 * @param h
 */
async function getRolesHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const roleEntityRepo: Repository<RoleEntity> = getRepository(RoleEntity);

  try {
    const roles = await roleEntityRepo.find();
    return h.response(roles).code(200);
  } catch (error) {
    request.log(["error", "role"], error);
    return Boom.badImplementation("Failed to get roles.");
  }
}

/**
 * Get a role by ID handler
 * @param request
 * @param h
 */
async function getRoleByIdHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const roleId = parseInt(request.params.roleId, 10);
  const roleEntityRepo: Repository<RoleEntity> = getRepository(RoleEntity);

  try {
    const role = await roleEntityRepo.findOne(roleId);
    if (!role) {
      return Boom.notFound("Role not found.");
    }
    return h.response(role).code(200);
  } catch (error) {
    request.log(["error", "role"], error);

    return Boom.badImplementation("Failed to get roles.");
  }
}

/**
 * Update a role handler
 */
async function updateRoleHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const roleId = parseInt(request.params.roleId, 10);
  const payload = request.payload as Partial<RoleInput>;
  const roleEntityRepo: Repository<RoleEntity> = getRepository(RoleEntity);

  try {
    const role = await roleEntityRepo.findOne(roleId);
    if (!role) {
      return Boom.notFound("Role not found.");
    }
    const updatedRole = Object.assign(role, payload);
    await roleEntityRepo.save(updatedRole);

    return h.response(updatedRole).code(200);
  } catch (error) {
    request.log(["error", "role"], error);
    return Boom.badImplementation("Failed to get roles.");
  }
}

/**
 * Delete a role handler
 */
/**
 * TODO - sau này có relation thì phải xoá cả relation nữa
 *
 */
async function deleteRoleHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const roleId = parseInt(request.params.roleId, 10);
  const roleEntityRepo: Repository<RoleEntity> = getRepository(RoleEntity);

  try {
    const role = await roleEntityRepo.findOne(roleId);
    if (!role) {
      return Boom.notFound("Role not found.");
    }

    await roleEntityRepo.delete(roleId);

    return h.response().code(204);
  } catch (error) {
    request.log(["error", "role"], error);
    return Boom.badImplementation("Failed to get roles.");
  }
}
