import "reflect-metadata";
import "dotenv-safe/config";
import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import hapiPino from "hapi-pino";
import path from "path";
import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";
import statusPlugin from "./plugins/status";
import dbPlugin from "./plugins/db";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0", // docker don't know localhost,
  routes: {
    validate: {
      failAction: async (_, err: any): Promise<void> => {
        if (__prod__) {
          // In prod, log a limited error message and throw the default Bad Request error.
          throw Boom.badRequest(`Invalid request payload input`);
        } else {
          throw err;
        }
      },
    },
  },
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
      url: process.env.DATABASE_URL,
      logging: true,
      migrations: [path.join(__dirname, "./migrations/*")],
      entities: [path.join(__dirname, "./entities/*")],
      schema: process.env.DATABASE_SCHEMA,
      synchronize: true,
    } as ConnectionOptions,
  });

  await server.register([statusPlugin]);

  await server.initialize();

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
