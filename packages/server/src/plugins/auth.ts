import Hapi from "@hapi/hapi";
import Joi from "joi";
// import Boom from "@hapi/boom";
// import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { Tokens } from "../entities/Tokens";

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
    if (!process.env.JWT_SECRET) {
      server.log(
        "warn",
        "The JWT_SECRET env var is not set. This is unsafe! If running in production, set it."
      );
    }

    server.auth.strategy(process.env.API_AUTH_STRATEGY, "jwt", {
      key: process.env.JWT_SECRET || "fdsmnfmnerkjwhriwjhrewj",
      verifyOptions: { algorithms: [process.env.JWT_ALGORITHM] },
      validate: validateAPIToken,
    });

    server.auth.default(process.env.API_AUTH_STRATEGY);
  },
};

export default authPlugin;

interface APITokenPayload {
  tokenId: number;
}

const apiTokenSchema = Joi.object({
  tokenId: Joi.number().integer().required(),
});

const validateAPIToken = async (
  decode: APITokenPayload,
  request: Hapi.Request
) => {
  const { tokenId } = decode;
  const { error } = apiTokenSchema.validate(decode);

  if (error) {
    request.log(["error", "auth"], `API token error: ${error.message}`);
    return { isValid: false };
  }

  try {
    const tokenRepo: Repository<Tokens> = request.server.app.dbConnection.getRepository(
      Tokens
    );

    const fetchedToken = await tokenRepo.findOne({
      where: {
        id: tokenId,
      },
      relations: ["user"],
    });
    // Check if token could be found in database and is valid
    if (!fetchedToken || !fetchedToken?.valid) {
      return { isValid: false, errorMessage: "Invalid token" };
    }

    return {
      isValid: true,
      credentials: {
        userId: fetchedToken.user.id,
      },
    };
  } catch (error) {
    request.log(["error", "auth", "db"], error);
    return { isValid: false, errorMessage: "DB Error" };
  }
};
