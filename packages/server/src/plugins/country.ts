import Hapi from "@hapi/hapi";
import Joi from "joi";
import { COUNTRIES_PATH } from "@config/country";

const countriesPlugin: Hapi.Plugin<null> = {
  name: "@app/countries",
  register: async function (server: Hapi.Server) {
    server.route([
      // Create Country
      {
        method: "POST",
        path: `${COUNTRIES_PATH}`,
        handler: createCountryHandler,
        options: {
          validate: {
            payload: createCountryValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Get Countries
      {
        method: "GET",
        path: `${COUNTRIES_PATH}`,
        handler: getCountriesHandler,
        options: {
          validate: {
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Get a country
      {
        method: "GET",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: getCountryByIdHandler,
        options: {
          validate: {
            params: Joi.object({
              countryId: Joi.number().integer(),
            }),
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Update country
      {
        method: "PUT",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: updateCountryHandler,
        options: {
          validate: {
            params: Joi.object({
              countryId: Joi.number().integer(),
            }),
            payload: updateCountryValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
      // Delete Country
      {
        method: "DELETE",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: deleteCountryHandler,
        options: {
          validate: {
            params: Joi.object({
              countryId: Joi.number().integer(),
            }),
            failAction: (_request, _h, err: Error | undefined) => {
              // show validation errors to user https://github.com/hapijs/hapi/issues/3706
              throw err;
            },
          },
        },
      },
    ]);
  },
};

export default countriesPlugin;

const CountryInputValidator = Joi.object({
  name: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.required(),
  }),
  code: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
});

const createCountryValidator = CountryInputValidator.tailor("create");
const updateCountryValidator = CountryInputValidator.tailor("update");
