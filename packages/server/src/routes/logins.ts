import Hapi from "@hapi/hapi";
import { LoginController } from "../controllers/login";
import { failAction } from "../utils/failAction";
import { loginInputValidator } from "../validations/login";

const loginRoutes: Hapi.Plugin<null> = {
  name: "@app/login",
  register: async function (server: Hapi.Server) {
    const loginController = new LoginController();

    server.route([
      {
        method: "POST",
        path: "/login",
        handler: loginController.loginHandler,
        options: {
          auth: false,
          validate: {
            failAction: failAction,
            payload: loginInputValidator,
          },
        },
      },
    ]);
  },
};

export default loginRoutes;
