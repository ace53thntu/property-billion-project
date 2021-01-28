import CatboxRedis from "@hapi/catbox-redis";
import Boom from "@hapi/boom";
import { ServerOptions } from "@hapi/hapi";
import { __prod__ } from "../constants";

export const server: ServerOptions = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["X-Access-Token", "X-Refresh-Token"],
      additionalExposedHeaders: ["X-Access-Token", "X-Refresh-Token"],
    },
    validate: {
      failAction: async (_request, _h, err?: Error): Promise<void> => {
        if (__prod__) {
          // In prod, log a limited error message and throw the default Bad Request error.
          throw Boom.badRequest(`Invalid request payload input`);
        } else {
          throw err;
        }
      },
    },
    cache: {
      privacy: "private",
      expiresIn: 30 * 1000,
    },
  },
  cache: [
    {
      name: "redis-cache",
      provider: {
        constructor: CatboxRedis,
        options: {
          partition: "property-cache",
        },
      },
    },
  ],
};
