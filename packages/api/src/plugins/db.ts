import Hapi from "@hapi/hapi";
import { createConnection, ConnectionOptions, Connection } from "typeorm";

// Module augmentation to add shared application state
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33809#issuecomment-472103564
declare module "@hapi/hapi" {
  interface ServerApplicationState {
    dbConnection: Connection;
  }
}

// plugin to create connection with database by typeorm
const dbPlugin: Hapi.Plugin<ConnectionOptions> = {
  name: "@app/db",
  register: async function (server: Hapi.Server, options: ConnectionOptions) {
    const connection = await createConnection(options);
    server.app.dbConnection = connection;

    // Close DB connection after the server's connection listeners are stopped
    // Related issue: https://github.com/hapijs/hapi/issues/2839
    server.ext({
      type: "onPostStop",
      method: async (server: Hapi.Server) => {
        server.app.dbConnection.close();
      },
    });
  },
};

export default dbPlugin;
