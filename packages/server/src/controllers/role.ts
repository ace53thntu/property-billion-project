import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { IRoleInput } from "../interfaces/IRole";
import { getCustomRepository } from "typeorm";
import { RoleRepository } from "../repositories/RoleRepository";
import { errorHandler } from "../utils/errorUtil";

export class RoleController {
  /**
   * Create a Role
   * @param request
   * @param h
   */
  public async createRoleHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const payload = request.payload as IRoleInput;

    const roleRepo = getCustomRepository(RoleRepository);

    try {
      const createdRole = await roleRepo.insert({
        name: payload.name,
        description: payload.description,
      });

      return h.response(createdRole).code(201);
    } catch (error) {
      request.log(["error", "role"], error);
      return errorHandler(error);
    }
  }

  /**
   * Get Roles
   * @param request
   * @param h
   */
  public async getRolesHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const roleRepo = getCustomRepository(RoleRepository);

    try {
      const roles = await roleRepo.find();
      if (!roles?.length) {
        return h.response().code(204);
      }
      return h.response(roles).code(200);
    } catch (error) {
      request.log(["error", "role"], error);
      return errorHandler(error);
    }
  }

  /**
   * Get Role by roleId
   * @param request
   * @param h
   */
  public async getRoleByIdHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const roleId = parseInt(request.params.roleId, 10);
    const roleRepo = getCustomRepository(RoleRepository);

    try {
      const role = await roleRepo.findById(roleId);
      if (!role) {
        return Boom.notFound("Role not found.");
      }

      return h.response(role).code(200);
    } catch (error) {
      request.log(["error", "role"], error);
      return errorHandler(error);
    }
  }

  /**
   * Update Role
   * @param request
   * @param h
   */
  public async updateRoleHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const roleId = parseInt(request.params.roleId, 10);
    const payload = request.payload as Partial<IRoleInput>;
    const roleRepo = getCustomRepository(RoleRepository);

    try {
      const role = await roleRepo.findById(roleId);
      if (!role) {
        return Boom.notFound("Role not found.");
      }

      const updatedRole = Object.assign(role, payload);
      await roleRepo.save(updatedRole);

      return h.response(role).code(200);
    } catch (error) {
      request.log(["error", "role"], error);
      return errorHandler(error);
    }
  }

  /**
   * Delete Role
   * @param request
   * @param h
   */
  public async deleteRoleHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const roleId = parseInt(request.params.roleId, 10);
    const roleRepo = getCustomRepository(RoleRepository);

    try {
      const role = await roleRepo.findById(roleId);
      if (!role) {
        return Boom.notFound("Role not found.");
      }

      /**
       * TODO - sau này có relation thì phải xoá cả relation nữa
       *
       */
      await roleRepo.delete(roleId);

      return h.response().code(204);
    } catch (error) {
      request.log(["error", "role"], error);
      return errorHandler(error);
    }
  }
}
