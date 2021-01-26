import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import argon2 from "argon2";
import __omit from "lodash.omit";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { IUserInput } from "../interfaces/IUserInput";
import { errorHandler } from "../utils/errorUtil";
export class UserController {
  /**
   * Handle get Users
   */
  public async getUsersHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);

    try {
      // ví dụ về việc cache api value bằng redis
      const { value, cached } = await request.server.app.usersCache.get(
        "users"
      );

      if (value && cached) {
        const lastModified = new Date(cached.stored);
        return h
          .response(value)
          .code(200)
          .header("Last-modified", lastModified.toUTCString());
      }
      const users = await userRepo.find();
      await request.server.app.usersCache.set("users", users);
      const lastModified = new Date();
      return h
        .response(users)
        .code(200)
        .header("Last-modified", lastModified.toUTCString());
    } catch (error) {
      request.logger.error(["user"], error);
      return errorHandler(error);
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
      return errorHandler(error);
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
      return errorHandler(error);
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
      return errorHandler(error);
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
      return errorHandler(error);
    }
  }
}
