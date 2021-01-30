import Hapi, { RouteOptionsPreArray } from "@hapi/hapi";
import Boom from "@hapi/boom";
import __omit from "lodash/omit";
import { v4 as uuidv4 } from "uuid";
import { getCustomRepository } from "typeorm";
import { UserEntity } from "@entities/User";
import { getIP } from "@utils/getIP";
import { AuthAttemptRepository } from "@repositories/AuthAttemptRepository";
import { errorHandler } from "@utils/errorUtil";
import { createToken } from "@utils/createToken";
import { LoginInput } from "@interfaces/ILogin";
import { SessionRepository } from "@repositories/SessionRepository";
import { UserRepository } from "@repositories/UserRepository";
import { Config } from "@config/index";

export class LoginController {
  static loginPre: RouteOptionsPreArray = [
    {
      assign: "abuseDetected",
      method: async function (request: Hapi.Request, h: Hapi.ResponseToolkit) {
        const authAttemptRepo = getCustomRepository(AuthAttemptRepository);
        const { email } = request.payload as LoginInput;
        const ip = getIP(request);

        try {
          const detected = await authAttemptRepo.abuseDetected(ip, email);
          if (detected) {
            return Boom.unauthorized(
              "Maximum number of auth attempts reached. Please try again later."
            );
          }
          return h.continue;
        } catch (error) {
          return errorHandler(error);
        }
      },
    },
    {
      assign: "user",
      method: async function (request: Hapi.Request) {
        const { email, password } = request.payload as LoginInput;
        const userRepo = getCustomRepository(UserRepository);

        try {
          const user = await userRepo.findByCredentials(email, password);

          if (user) {
            return user;
          } else {
            return false;
          }
        } catch (error) {
          return errorHandler(error);
        }
      },
    },
    {
      assign: "logAttempt",
      method: async function (request: Hapi.Request, h: Hapi.ResponseToolkit) {
        if (request.pre.user) {
          return h.continue;
        }

        const { email } = request.payload as LoginInput;
        const ip = getIP(request);
        const authAttemptRepo = getCustomRepository(AuthAttemptRepository);

        try {
          await authAttemptRepo.createInstance(ip, email);
          return Boom.unauthorized("Invalid Email or Password.");
        } catch (error) {
          return errorHandler(error);
        }
      },
    },
  ];

  public async loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const userRepo = getCustomRepository(UserRepository);
    const sessionRepo = getCustomRepository(SessionRepository);

    const user = request.pre.user as UserEntity;

    try {
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
