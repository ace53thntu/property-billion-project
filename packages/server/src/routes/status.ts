import Hapi from "@hapi/hapi";

/**
 * route for check app status
 */
const statusRoute: Hapi.Plugin<undefined> = {
  name: "@app/status",
  register: async function (server: Hapi.Server) {
    server.route({
      method: "GET",
      path: "/",
      handler: (_, h: Hapi.ResponseToolkit) =>
        h.response({ status: "ok" }).code(200),
      options: {
        auth: false,
        tags: ["api", "health"],
        description: "Check app status.",
      },
    });
  },
};

export default statusRoute;
