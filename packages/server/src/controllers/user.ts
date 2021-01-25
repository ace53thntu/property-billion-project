import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import argon2 from "argon2";
import __omit from "lodash.omit";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_NOT_NULL_VIOLATION, PG_UNIQUE_VIOLATION } from "../utils/pgCode";
import { IUserInput } from "../interfaces/IUserInput";

export class UserController {
  /**
   * Handle get Users
   */
  public async getUsersHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);

    try {
      const users = await userRepo.find();
      return h.response(users).code(200);
    } catch (error) {
      request.logger.error(["user"], error);
      return Boom.badImplementation("Failed to get users.");
    }
  }

  /**
   * Handle create User
   */
  public async createUserHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const userRepo = getCustomRepository(UserRepository);
    const payload = request.payload as IUserInput;
    const hashedPassword = await argon2.hash(payload.password);

    try {
      const user = await userRepo.insert({
        ...payload,
        password: hashedPassword,
      });

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

  /**
   * Get User by Id
   */
  public async getUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);
    const userId = parseInt(request.params.userId, 10);

    try {
      const user = await userRepo.findById(userId);
      if (!user) {
        return Boom.notFound("User not found.");
      }
      return h.response(user).code(200);
    } catch (error) {
      request.log(["error", "role"], error);
      return Boom.badImplementation("Failed to get user.");
    }
  }

  /**
   * Delete User by Id
   */
  public async deleteUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);
    const userId = parseInt(request.params.userId, 10);

    try {
      const existedUser = await userRepo.findById(userId);
      if (!existedUser) {
        return Boom.notFound("User not found.");
      }
      await userRepo.delete(userId);
      return h.response().code(204);
    } catch (error) {
      request.log(["error", "role"], error);
      return Boom.badImplementation("Failed to delete user.");
    }
  }

  public async updateUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);
    const userId = parseInt(request.params.userId, 10);
    const payload = request.payload as Partial<IUserInput>;

    try {
      const existedUser = await userRepo.findById(userId);
      if (!existedUser) {
        return Boom.notFound("User not found.");
      }
      const updatedUser = Object.assign(existedUser, payload);
      await userRepo.update(userId, updatedUser);

      return h.response(updatedUser).code(200);
    } catch (error) {
      request.log(["error", "role"], error);
      return Boom.badImplementation("Failed to update user.");
    }
  }
}
