import Hapi from "@hapi/hapi";
import Joi from "joi";
import Boom from "@hapi/boom";
import { Repository, getRepository } from "typeorm";
import { CountryEntity } from "../entities/Country";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_UNIQUE_VIOLATION } from "../utils/pgCode";
import { COUNTRIES_PATH } from "../config/country";

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

interface CountryInput {
  name: string;
  code?: string;
}

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

/**
 * Create a Country handler
 */
async function createCountryHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const countryEntityRepo: Repository<CountryEntity> = getRepository(
    CountryEntity
  );
  const payload = request.payload as CountryInput;
  let createCountry;
  try {
    const result = await countryEntityRepo
      .createQueryBuilder()
      .insert()
      .values({
        name: payload.name,
        code: payload.code,
      })
      .returning("*")
      .execute();

    createCountry = result.raw[0];

    return h.response(createCountry).code(201);
  } catch (error) {
    request.log(["error", "country"], error);
    if (isQueryFailedError(error) && error?.code === PG_UNIQUE_VIOLATION) {
      return Boom.badRequest(`Country "name" already exists.`);
    }
    return Boom.badImplementation("Failed to create Country.");
  }
}

/**
 * Get countries handler
 * @param request
 * @param h
 */
async function getCountriesHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const countryRepo: Repository<CountryEntity> = getRepository(CountryEntity);

  try {
    const countries = await countryRepo.find();
    return h.response(countries).code(200);
  } catch (error) {
    request.log(["error", "country"], error);
    return Boom.badImplementation("Failed to get countries.");
  }
}

/**
 * Get a country by ID handler
 * @param request
 * @param h
 */
async function getCountryByIdHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const countryId = parseInt(request.params.countryId, 10);
  const countryEntityRepo: Repository<CountryEntity> = getRepository(
    CountryEntity
  );

  try {
    const country = await countryEntityRepo.findOne(countryId);
    if (!country) {
      return Boom.notFound("Country not found.");
    }
    return h.response(country).code(200);
  } catch (error) {
    request.log(["error", "country"], error);

    return Boom.badImplementation("Failed to get the Country.");
  }
}

/**
 * Update a country handler
 */
async function updateCountryHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const countryId = parseInt(request.params.countryId, 10);
  const payload = request.payload as Partial<CountryInput>;
  const countryEntityRepo: Repository<CountryEntity> = getRepository(
    CountryEntity
  );

  try {
    const country = await countryEntityRepo.findOne(countryId);
    if (!country) {
      return Boom.notFound("Country not found.");
    }
    const updatedCountry = Object.assign(country, payload);
    await countryEntityRepo.save(updatedCountry);

    return h.response(updatedCountry).code(200);
  } catch (error) {
    request.log(["error", "country"], error);
    return Boom.badImplementation("Failed to update the country.");
  }
}

/**
 * Delete a country handler
 */
/**
 * TODO - sau này có relation thì phải xoá cả relation nữa
 *
 */
async function deleteCountryHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const countryId = parseInt(request.params.countryId, 10);
  const countryEntityRepo: Repository<CountryEntity> = getRepository(
    CountryEntity
  );

  try {
    const country = await countryEntityRepo.findOne(countryId);
    if (!country) {
      return Boom.notFound("Country not found.");
    }

    await countryEntityRepo.delete(countryId);

    return h.response().code(204);
  } catch (error) {
    request.log(["error", "country"], error);
    return Boom.badImplementation("Failed to delete the Country.");
  }
}
