import Hapi from "@hapi/hapi";
import { COUNTRIES_PATH } from "@config/country";
import { CountryController } from "@controllers/country";
import {
  createCountryValidator,
  updateCountryValidator,
  countryParamsValidator,
} from "@validations/country";

const countryRoutes: Hapi.Plugin<null> = {
  name: "@app/countries",
  register: async function (server: Hapi.Server) {
    const countryController = new CountryController();
    server.route([
      // Create Country
      {
        method: "POST",
        path: `${COUNTRIES_PATH}`,
        handler: countryController.createCountryHandler,
        options: {
          validate: {
            payload: createCountryValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              throw err;
            },
          },
        },
      },
      // Get Countries
      {
        method: "GET",
        path: `${COUNTRIES_PATH}`,
        handler: countryController.getCountriesHandler,
        options: {
          validate: {
            failAction: (_request, _h, err: Error | undefined) => {
              throw err;
            },
          },
          auth: false,
        },
      },
      // Get a country
      {
        method: "GET",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: countryController.getCountryByIdHandler,
        options: {
          validate: {
            params: countryParamsValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              throw err;
            },
          },
        },
      },
      // Update country
      {
        method: "PUT",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: countryController.updateCountryHandler,
        options: {
          validate: {
            params: countryParamsValidator,
            payload: updateCountryValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              throw err;
            },
          },
        },
      },
      // Delete Country
      {
        method: "DELETE",
        path: `${COUNTRIES_PATH}/{countryId}`,
        handler: countryController.deleteCountryHandler,
        options: {
          validate: {
            params: countryParamsValidator,
            failAction: (_request, _h, err: Error | undefined) => {
              throw err;
            },
          },
        },
      },
    ]);
  },
};

export default countryRoutes;
