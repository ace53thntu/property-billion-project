import "reflect-metadata";
import "dotenv-safe/config";
import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import hapiPino from "hapi-pino";
import hapiAuthJWT from "hapi-auth-jwt2";
import path from "path";
import CatboxRedis from "@hapi/catbox-redis";
import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";
import dbPlugin from "./plugins/db";
import statusPlugin from "./plugins/status";
import rolesPlugin from "./plugins/role";
import authPlugin from "./plugins/auth";
import usersPlugin from "./plugins/user";
import swaggerPlugin from "./plugins/swagger";
import rateLimitPlugin from "./plugins/rateLimit";
import countriesPlugin from "./plugins/country";

declare module "@hapi/hapi" {
  interface ServerApplicationState {
    usersCache: any;
  }
}

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0", // docker don't know localhost,
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
});

export async function createServer(): Promise<Hapi.Server> {
  // Register the logger
  await server.register({
    plugin: hapiPino,
    options: {
      logEvents:
        process.env.CI === "true" || process.env.TEST === "true"
          ? false
          : undefined,
      prettyPrint: !__prod__,
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ["req.headers.authorization"],
    },
  });

  // Register the database
  await server.register({
    plugin: dbPlugin,
    options: {
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: true,
      synchronize: true,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: [path.join(__dirname, "./entities/*")],
    } as ConnectionOptions,
  });

  await server.register({
    plugin: rateLimitPlugin,
  });

  // register routes
  await server.register([
    hapiAuthJWT,
    swaggerPlugin,
    statusPlugin,
    authPlugin,
    rolesPlugin,
    usersPlugin,
    countriesPlugin,
  ]);

  await server.initialize();
  // server.table().forEach()
  return server;
}

export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start();
  server.log("info", `Server running on ${server.info.uri}`);
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
