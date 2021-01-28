import Hapi from "@hapi/hapi";
import { PropertyController } from "../controllers/property";
import { failAction } from "../utils/failAction";
import {
  createUserValidator,
  updateUserValidator,
  propertyParamsValidator,
} from "../validations/property";

const propertyPlugin: Hapi.Plugin<null> = {
  name: "@app/property",
  register: async function (server: Hapi.Server) {
    const propertyController = new PropertyController();

    server.route([
      {
        method: "POST",
        path: "/properties",
        handler: propertyController.createPropertyHandler,
        options: {
          auth: false,
          tags: ["api", "properties"],
          description: "Create a property.",
          notes: "Return a property info.",
          validate: {
            payload: createUserValidator,
            failAction,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "201": {
                  description: "Property created.",
                },
                "400": {
                  description: "Wrong body.",
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
        path: "/properties",
        handler: propertyController.getPropertiesHandler,
        options: {
          auth: false,
          tags: ["api", "properties"],
          description: "Get properties.",
          notes: "Return properties info.",
          validate: {
            failAction,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Get properties success.",
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
        path: "/properties/{id}",
        handler: propertyController.getPropertyById,
        options: {
          auth: false,
          tags: ["api", "properties"],
          description: "Get a property.",
          notes: "Return a property info.",
          validate: {
            failAction,
            params: propertyParamsValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Get property success.",
                },
                "404": {
                  description: "Property not found.",
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
        method: "PUT",
        path: "/properties/{id}",
        handler: propertyController.updatePropertyById,
        options: {
          auth: false,
          tags: ["api", "properties"],
          description: "Update property.",
          validate: {
            failAction,
            params: propertyParamsValidator,
            payload: updateUserValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "200": {
                  description: "Update property success.",
                },
                "404": {
                  description: "Property not found.",
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
        path: "/properties/{id}",
        handler: propertyController.deletePropertyById,
        options: {
          auth: false,
          tags: ["api", "property"],
          description: "Delete property.",
          validate: {
            failAction,
            params: propertyParamsValidator,
          },
          plugins: {
            "hapi-swagger": {
              responses: {
                "204": {
                  description: "Delete property success.",
                },
                "404": {
                  description: "Property not found.",
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

export default propertyPlugin;
