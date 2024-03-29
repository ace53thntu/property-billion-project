import Hapi from "@hapi/hapi";
import { UserController } from "../controllers/user";
import { failAction } from "../utils/failAction";
import {
  createUserValidator,
  updateUserValidator,
  userParamsValidator,
} from "../validations/user";
import { logCreate } from "../policies/auditLog";
import { queryValidator } from "@validations/common";
import { Logger } from "@utils/logger";

const userRoutes: Hapi.Plugin<null> = {
  name: "@app/user",
  register: async function (server: Hapi.Server) {
    Logger.info("Registering - User routes");

    /**
     * tạo 1 segment cache
     */
    const usersCache = server.cache({
      cache: "redis-cache",
      expiresIn: 60 * 1000,
      segment: "users",
      getDecoratedValue: true,
    });

    /**
     * Gán vào server app để gọi
     * ở controller
     */
    server.app.usersCache = usersCache;

    const userController = new UserController();

    server.route([
      {
        method: "POST",
        path: "/users",
        handler: userController.createUserHandler,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Create a user.",
          notes: "Return a user info.",
          validate: {
            payload: createUserValidator,
            failAction,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "201": {
                  description: "User created.",
                },
                "400": {
                  description: "Wrong body.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
            policies: [logCreate("user")],
          },
        },
      },
      {
        method: "GET",
        path: "/users",
        handler: userController.getUsersHandler,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Get users.",
          notes: "Return users info.",
          validate: {
            failAction,
            query: queryValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Get users success.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
          },
        },
      },
      {
        method: "GET",
        path: "/users/{userId}",
        handler: userController.getUserById,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Get user.",
          notes: "Return user info.",
          validate: {
            failAction,
            params: userParamsValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Get user success.",
                },
                "404": {
                  description: "User not found.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
          },
        },
      },
      {
        method: "DELETE",
        path: "/users/{userId}",
        handler: userController.deleteUserById,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Delete user.",
          validate: {
            failAction,
            params: userParamsValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "204": {
                  description: "Delete user success.",
                },
                "404": {
                  description: "User not found.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
          },
        },
      },
      {
        method: "UPDATE",
        path: "/users/{userId}",
        handler: userController.updateUserById,
        options: {
          auth: false,
          tags: ["api", "users"],
          description: "Update user.",
          validate: {
            failAction,
            params: userParamsValidator,
            payload: updateUserValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Update user success.",
                },
                "404": {
                  description: "User not found.",
                },
                "401": {
                  description: "Please login.",
                },
              },
            },
          },
        },
      },
    ]);
  },
};

export default userRoutes;
