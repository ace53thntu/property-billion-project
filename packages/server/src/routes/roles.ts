import Hapi from "@hapi/hapi";
import { logCreate } from "../policies/auditLog";
import { RoleController } from "../controllers/role";
import {
  createRoleValidator,
  roleParamsValidator,
  updateRoleValidator,
} from "../validations/role";
import { failAction } from "../utils/failAction";

const roleRoutes: Hapi.Plugin<null> = {
  name: "@app/role",
  register: async function (server: Hapi.Server) {
    const roleController = new RoleController();

    server.route([
      // Create role
      {
        method: "POST",
        path: "/roles",
        handler: roleController.createRoleHandler,
        options: {
          validate: {
            payload: createRoleValidator,
            failAction,
          },
          plugins: {
            policies: [logCreate("role")],
          },
        },
      },
      // Get roles
      {
        method: "GET",
        path: "/roles",
        handler: roleController.getRolesHandler,
        options: {
          validate: {
            failAction,
          },
        },
      },
      // Get role
      {
        method: "GET",
        path: "/roles/{roleId}",
        handler: roleController.getRoleByIdHandler,
        options: {
          validate: {
            params: roleParamsValidator,
            failAction,
          },
        },
      },
      // Update role
      {
        method: "PUT",
        path: "/roles/{roleId}",
        handler: roleController.updateRoleHandler,
        options: {
          validate: {
            params: roleParamsValidator,
            payload: updateRoleValidator,
            failAction,
          },
        },
      },
      // Delete role
      {
        method: "DELETE",
        path: "/roles/{roleId}",
        handler: roleController.deleteRoleHandler,
        options: {
          validate: {
            params: roleParamsValidator,
            failAction,
          },
        },
      },
    ]);
  },
};

export default roleRoutes;
