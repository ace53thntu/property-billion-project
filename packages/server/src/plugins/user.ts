import Hapi from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import argon2 from "argon2";
import __omit from "lodash.omit";
import { Repository, getRepository } from "typeorm";
import { Users as UsersEntity } from "../entities/Users";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_NOT_NULL_VIOLATION, PG_UNIQUE_VIOLATION } from "../utils/pgCode";

const usersPlugin: Hapi.Plugin<null> = {
  name: "@app/user",
  dependencies: ["@app/db"],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: "/users",
        handler: createUserHandler,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Create a user.",
          notes: "Return a user info.",
          validate: {
            payload: createUserValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "201": {
                  description: "User created.",
                },
                "400": {
                  description: "Wrong body.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
          },
        },
      },
    ]);
  },
};

export default usersPlugin;

interface UserInput {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  status?: string;
  password: string;
  address1?: string;
  address2?: string;
  gender?: string;
}

const userInputValidator = Joi.object({
  firstName: Joi.string()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("The first name of user."),
  lastName: Joi.string()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("The last name of user."),
  phone: Joi.string()
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    })
    .description("The phone number of user."),
  email: Joi.string()
    .email()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  status: Joi.boolean().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  password: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  address1: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  address2: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  gender: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
});

const createUserValidator = userInputValidator.tailor("create");
// const updateRoleValidator = userInputValidator.tailor("update");

/**
 * Create user handler
 */
async function createUserHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const usersEntityRepo: Repository<UsersEntity> = getRepository(UsersEntity);
  const payload = request.payload as UserInput;
  const hashedPassword = await argon2.hash(payload.password);
  let user;

  try {
    const result = await usersEntityRepo
      .createQueryBuilder()
      .insert()
      .values({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: hashedPassword,
      })
      .returning("*")
      .execute();

    user = result.raw[0];

    return h.response(__omit(user, ["password"])).code(201);
  } catch (error) {
    request.logger.error(["user"], error);
    if (isQueryFailedError(error) && error?.code === PG_UNIQUE_VIOLATION) {
      return Boom.badRequest(`"Email" already exists.`);
    }
    if (isQueryFailedError(error) && error?.code === PG_NOT_NULL_VIOLATION) {
      return Boom.badRequest(error?.message);
    }
    return Boom.badImplementation("Failed to create user.");
  }
}
