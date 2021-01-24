/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from "jsonwebtoken";
import Boom from "@hapi/boom";
import { ISessions } from "../plugins/auth";

export function createToken(
  user?: any,
  session?: ISessions,
  // scope?: string[],
  expirationPeriod?: string,
  Log?: any
): string {
  const JWT_SECRET: jwt.Secret =
    process.env.JWT_SECRET || "asdwerbwerwewmbwwoewep";

  try {
    let token = "";

    if (session) {
      token = jwt.sign(
        {
          sessionId: session.id,
          sessionKey: session.key,
          passwordHash: session.passwordHash,
          // scope,
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: expirationPeriod,
        }
      );
    } else {
      token = jwt.sign(
        {
          user,
          // scope,
        },
        JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: expirationPeriod,
        }
      );
    }

    return token;
  } catch (error) {
    Log(["error", "createToken"], error?.message);
    throw Boom.badImplementation(error?.message);
  }
}
