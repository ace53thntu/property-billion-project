import Hapi from "@hapi/hapi";

/**
 * route for check app status
 */
const statusPlugin: Hapi.Plugin<undefined> = {
  name: "@app/status",
  register: async function (server: Hapi.Server) {
    server.route({
      method: "GET",
      path: "/",
      options: {
        auth: false,
      },
      handler: (_, h: Hapi.ResponseToolkit) =>
        h.response({ status: "ok" }).code(200),
    });
  },
};

export default statusPlugin;
