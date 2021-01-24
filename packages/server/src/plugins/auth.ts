import Hapi from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { Repository, getRepository } from "typeorm";
// import { Tokens } from "../entities/Tokens";
import { Users as UsersEntity } from "../entities/Users";

declare module "@hapi/hapi" {
  interface AuthCredentials {
    userId: number;
    tokenId: number;
    // isAdmin: boolean;
  }
}

const authPlugin: Hapi.Plugin<null> = {
  name: "@app/auth",
  dependencies: ["@app/db", "hapi-auth-jwt2"],
  register: async function (server: Hapi.Server) {
    if (!JWT_SECRET) {
      server.log(
        "warn",
        "The JWT_SECRET env var is not set. This is unsafe! If running in production, set it."
      );
    }

    server.auth.strategy(API_AUTH_STRATEGY, "jwt", {
      key: JWT_SECRET || "fdsmnfmnerkjwhriwjhrewj",
      verifyOptions: { algorithms: [JWT_ALGORITHM] },
      validate: validateAPIToken,
    });

    // Require by default API token unless otherwise configured
    server.auth.default(API_AUTH_STRATEGY);

    server.route([
      {
        method: "POST",
        path: "/login",
        handler: loginHandler,
        options: {
          auth: false,
          validate: {
            failAction: (_request, _h, err) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
            payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().required(),
            }),
          },
        },
      },
    ]);
  },
};

export default authPlugin;

export const API_AUTH_STRATEGY = "API";

const JWT_SECRET = "fdgdgfgdf";
const JWT_ALGORITHM = "HS256";
interface APITokenPayload {
  // tokenId: number;
  userId: number;
}

interface LoginInput {
  email: string;
  password: string;
}

const apiTokenSchema = Joi.object({
  // tokenId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
});

const validateAPIToken = async (
  decode: APITokenPayload,
  request: Hapi.Request
) => {
  const { userId } = decode;
  const { error } = apiTokenSchema.validate(decode);

  if (error) {
    request.log(["error", "auth"], `API token error: ${error.message}`);
    return { isValid: false };
  }

  const usersEntityRepo: Repository<UsersEntity> = getRepository(UsersEntity);

  try {
    const user = await usersEntityRepo.findOne(
      { id: userId },
      {
        relations: ["tokens"],
      }
    );

    if (!user) {
      return { isValid: false, errorMessage: "Invalid token" };
    }

    return {
      isValid: true,
      credentials: {
        // userId: fetchedToken.user.id,
      },
    };
  } catch (error) {
    request.log(["error", "auth", "db"], error);
    return { isValid: false, errorMessage: "DB Error" };
  }
};

async function loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { email, password } = request.payload as LoginInput;
  const usersEntityRepo: Repository<UsersEntity> = getRepository(UsersEntity);

  try {
    const user = await usersEntityRepo.findOne({
      email,
    });

    if (!user) {
      return Boom.unauthorized("Email or password invalid.");
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return Boom.unauthorized("Email or password invalid.");
    }

    const token = generateAuthToken(user.id);

    return h.response({ ...user, token }).code(200);
  } catch (error) {
    request.log(["error", "auth"], error);
    return Boom.badImplementation("Failed to get roles.");
  }
}

// Generate a signed JWT token with the tokenId in the payload
function generateAuthToken(userId: number): string {
  const jwtPayload = { userId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    // noTimestamp: true,
    expiresIn: "1h",
  });
}
