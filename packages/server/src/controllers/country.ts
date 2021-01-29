import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { Repository, getRepository } from "typeorm";
import { CountryEntity } from "../entities/Country";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_UNIQUE_VIOLATION } from "../utils/pgCode";
import { CountryInput } from "@interfaces/ICountry";

export class CountryController {
  /**
   * Create a Country handler
   */
  public async createCountryHandler(
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
  public async getCountriesHandler(
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
  public async getCountryByIdHandler(
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
  public async updateCountryHandler(
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
  public async deleteCountryHandler(
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
}
