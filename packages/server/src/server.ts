import "reflect-metadata";
import Hapi from "@hapi/hapi";
import hapiPino from "hapi-pino";
import hapiAuthJWT from "hapi-auth-jwt2";
import path from "path";
import { __prod__ } from "./config/constants";
import { config as Config } from "./config";

// plugins
import dbPlugin from "./plugins/db";
import swaggerPlugin from "./plugins/swagger";
import rateLimitPlugin from "./plugins/rateLimit";
import authPlugin from "./plugins/auth";
// routes
import statusPlugin from "./plugins/status";
import rolesPlugin from "./plugins/role";
import usersPlugin from "./plugins/user";
import propertiesPlugin from "./plugins/property";
import countriesPlugin from "./plugins/country";
import policiesPlugin from "./plugins/policy";
import loginPlugin from "./plugins/login";

declare module "@hapi/hapi" {
  interface ServerApplicationState {
    usersCache: any;
  }
  interface PluginSpecificConfiguration {
    policies?: any;
  }
}

const server: Hapi.Server = Hapi.server(Config.server);

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
    options: Config.database.postgres,
  });

  // register rate limit
  await server.register({
    plugin: rateLimitPlugin,
  });

  // register policies plugin
  await server.register({
    plugin: policiesPlugin,
    options: {
      policyDirectory: path.join(__dirname, "/policies"),
    },
  });

  // register auth plugin
  await server.register([hapiAuthJWT, authPlugin]);

  // register swagger plugin
  await server.register({
    plugin: swaggerPlugin,
  });

  // register routes
  await server.register([
    statusPlugin,
    loginPlugin,
    rolesPlugin,
    usersPlugin,
    countriesPlugin,
    propertiesPlugin,
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
