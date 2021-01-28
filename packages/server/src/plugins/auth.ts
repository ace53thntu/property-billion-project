import Hapi from "@hapi/hapi";
import Boom, { Boom as BoomType } from "@hapi/boom";
import { Repository, getRepository } from "typeorm";
import { UserEntity } from "../entities/User";
import { SessionEntity } from "../entities/Session";
import { createToken } from "../utils/createToken";
import { config as Config } from "../config";
import { errorHandler } from "../utils/errorUtil";

const {
  jwtSecret,
  constants: { EXPIRATION_PERIOD, AUTH_STRATEGIES },
} = Config;
export interface ISessions {
  id: number;
  key: string;
  passwordHash: string;
}

declare module "@hapi/hapi" {
  interface AuthCredentials {
    session: ISessions;
  }
}

const authPlugin: Hapi.Plugin<null> = {
  name: "@app/auth",
  dependencies: ["hapi-auth-jwt2"],
  register: async function (server: Hapi.Server) {
    if (!jwtSecret) {
      server.log(
        "warn",
        "The JWT_SECRET env var is not set. This is unsafe! If running in production, set it."
      );
    }

    server.ext(
      "onPostHandler",
      (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        const credentials = request.auth.credentials;

        if (request.response instanceof BoomType) {
          return h.continue;
        }

        // if the auth credentials contain session info (i.e. a refresh token), respond with a fresh set of tokens in the header.
        if (credentials && credentials.session && request.response.header) {
          request.response.header(
            "X-Access-Token",
            createToken(
              credentials.user,
              undefined,
              EXPIRATION_PERIOD.SHORT,
              request.log
            )
          );
          request.response.header(
            "X-Refresh-Token",
            createToken(
              undefined,
              credentials.session,
              EXPIRATION_PERIOD.LONG,
              request.log
            )
          );
        }

        return h.continue;
      }
    );

    server.auth.strategy(AUTH_STRATEGIES, "jwt", {
      key: jwtSecret,
      verifyOptions: { algorithms: ["HS256"], ignoreExpiration: true },
      validate: validateAPIToken,
    });

    // Require by default API token unless otherwise configured
    server.auth.default(AUTH_STRATEGIES);
  },
};

export default authPlugin;
interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password?: string;
  address1?: string;
  address2?: string;
  gender?: string;
  avatar?: string;
  facebook: string;
  zalo?: string;
  status: boolean;
}

interface IDecode {
  iat: number;
  exp: number;
  user?: IUser;
  sessionId?: number;
  sessionKey?: string;
  passwordHash?: string;
}

const validateAPIToken = async (decode: IDecode, request: Hapi.Request) => {
  try {
    // if the token is expired, respond with token type so the client can switch to refresh token if necessary
    if (decode.exp < Math.floor(Date.now() / 1000)) {
      if (decode.user) {
        throw Boom.unauthorized("Expired Access Token");
      } else {
        throw Boom.unauthorized("Expired Refresh Token");
      }
    }

    // If the token does not contain session info, then simply authenticate and continue
    if (decode.user) {
      return {
        isValid: true,
        credentials: {
          user: {
            ...decode.user,
            password: "",
          },
          // scope: decode.scope,
        },
      };
    }
    // If the token does contain session info (i.e. a refresh token), then use the session to
    // authenticate and respond with a fresh set of tokens in the header
    else if (decode.sessionId) {
      const sessionEntityRepo: Repository<SessionEntity> = getRepository(
        SessionEntity
      );
      const userEntityRepo: Repository<UserEntity> = getRepository(UserEntity);

      const session = await sessionEntityRepo.findOne({
        where: {
          id: decode.sessionId,
          key: decode.sessionKey,
        },
        relations: ["user"],
      });

      if (!session) {
        return { isValid: false };
      }

      const user = await userEntityRepo.findOne(session.user.id);

      if (!user) {
        return {
          isValid: false,
        };
      }

      if (user.password !== decode.passwordHash) {
        return {
          isValid: false,
        };
      }

      return {
        isValid: true,
        credentials: {
          user: {
            ...user,
            password: "",
          },
          session,
          // scope: decode.scope,
        },
      };
    }
    return {
      isValid: false,
    };
  } catch (error) {
    request.log(["error", "auth"], error?.message);
    return errorHandler(error);
  }
};
