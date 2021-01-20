import Hapi from "@hapi/hapi";
import statusPlugin from "./plugins/status";

const isProduction = process.env.NODE_ENV === "production";

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || "0.0.0.0", // docker don't know localhost
});

export async function start(): Promise<Hapi.Server> {
  await server.register([statusPlugin]);

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start().catch((err) => {
  console.log(err);
});
