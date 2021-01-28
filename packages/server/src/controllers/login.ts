import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import argon2 from "argon2";
import __omit from "lodash/omit";
import { v4 as uuidv4 } from "uuid";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { SessionRepository } from "../repositories/SessionRepository";
import { LoginInput } from "../interfaces/ILogin";
import { createToken } from "../utils/createToken";
import { config as Config } from "../config";
import { errorHandler } from "../utils/errorUtil";

export class LoginController {
  public async loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { email, password } = request.payload as LoginInput;
    const userRepo = getCustomRepository(UserRepository);
    const sessionRepo = getCustomRepository(SessionRepository);

    try {
      const user = await userRepo.findByEmailAndSelectPassword(email);
      if (!user) {
        return Boom.unauthorized("Email or password invalid.");
      }

      if (!user?.password?.length) {
        return Boom.notFound("User not found.");
      }
      /**
       * Verify user password
       */
      const valid = await argon2.verify(user.password, password);
      if (!valid) {
        return Boom.unauthorized("Email or password invalid.");
      }

      const accessToken = createToken(
        __omit(user, ["password"]),
        undefined,
        Config.constants.EXPIRATION_PERIOD.SHORT,
        request.log
      );

      let refreshToken = "";

      const existedSession = await sessionRepo.findByUserId(user.id);
      if (!existedSession) {
        const createdSession = await sessionRepo.insert({
          user: user,
          key: uuidv4(),
          passwordHash: user.password,
        });

        user.session = createdSession;
        await userRepo.save(user);

        refreshToken = createToken(
          undefined,
          createdSession,
          Config.constants.EXPIRATION_PERIOD.LONG,
          request.log
        );
      } else {
        const updatedSession = await sessionRepo.updateByUserId(user.id, {
          key: uuidv4(),
          passwordHash: user.password,
        });

        refreshToken = createToken(
          undefined,
          updatedSession,
          Config.constants.EXPIRATION_PERIOD.LONG,
          request.log
        );
      }

      return h
        .response({
          user: __omit(user, ["password"]),
          accessToken,
          refreshToken,
        })
        .code(200);
    } catch (error) {
      request.log(["error", "auth"], error);
      return errorHandler(error);
    }
  }
}
