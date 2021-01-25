import Hapi from "@hapi/hapi";
import * as HapiSwagger from "hapi-swagger";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";

const swaggerPlugin: Hapi.Plugin<null> = {
  name: "@app/swagger",
  register: async function (server: Hapi.Server) {
    try {
      await server.register([
        {
          plugin: Inert,
        },
        {
          plugin: Vision,
        },
        {
          plugin: HapiSwagger,
          options: {
            info: {
              title: "Property API",
              description: "Property API Documentation",
              version: "1.0",
            },
            tags: [
              {
                name: "auth",
                description: "API auth interface.",
              },
              {
                name: "users",
                description: "API users interface.",
              },
              {
                name: "roles",
                description: "API roles interface.",
              },
            ],
            swaggerUI: true,
            documentationPage: true,
            documentationPath: "/docs",
            securityDefinitions: {
              jwt: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
              },
            },
            security: [{ jwt: [] }],
          },
        },
      ]);
    } catch (error) {
      console.log("🚀 ~ file: swagger.ts ~ line 39 ~ error", error);
    }
  },
};

export default swaggerPlugin;
