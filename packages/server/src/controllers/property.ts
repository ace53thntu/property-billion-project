import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { getCustomRepository } from "typeorm";
import { PropertyRepository } from "../repositories/PropertyRepository";
import { IProperty } from "../interfaces/IProperty";
import { isQueryFailedError } from "../utils/catchPgError";
import { PG_NOT_NULL_VIOLATION } from "../utils/pgCode";

export class PropertyController {
  public async createPropertyHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const propertyRepo = getCustomRepository(PropertyRepository);
    const payload = request.payload as IProperty;

    try {
      const property = await propertyRepo.insert(payload);

      return h.response(property).code(201);
    } catch (error) {
      request.logger.error(["property"], error);
      if (isQueryFailedError(error) && error?.code === PG_NOT_NULL_VIOLATION) {
        return Boom.badRequest(error?.message);
      }
      return Boom.badImplementation("Failed to create property.");
    }
  }

  public async getPropertiesHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const propertyRepo = getCustomRepository(PropertyRepository);

    try {
      const properties = await propertyRepo.find();
      return h.response(properties).code(200);
    } catch (error) {
      request.logger.error(["property"], error);
      return Boom.badImplementation("Failed to get properties.");
    }
  }

  public async getPropertyById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const propertyRepo = getCustomRepository(PropertyRepository);
    const id = parseInt(request.params.id, 10);

    try {
      const user = await propertyRepo.findById(id);
      if (!user) {
        return Boom.notFound("Property not found.");
      }
      return h.response(user).code(200);
    } catch (error) {
      request.log(["error", "property"], error);
      return Boom.badImplementation("Failed to get property.");
    }
  }

  public async updatePropertyById(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const propertyRepo = getCustomRepository(PropertyRepository);
    const id = parseInt(request.params.id, 10);
    const payload = request.payload as Partial<IProperty>;

    try {
      const existedProperty = await propertyRepo.findById(id);
      if (!existedProperty) {
        return Boom.notFound("Property not found.");
      }
      const updatedUser = Object.assign(existedProperty, payload);
      await propertyRepo.update(id, updatedUser);

      return h.response(updatedUser).code(200);
    } catch (error) {
      request.log(["error", "property"], error);
      return Boom.badImplementation("Failed to update property.");
    }
  }

  public async deletePropertyById(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) {
    const propertyRepo = getCustomRepository(PropertyRepository);
    const id = parseInt(request.params.id, 10);

    try {
      const existedProperty = await propertyRepo.findById(id);
      if (!existedProperty) {
        return Boom.notFound("Property not found.");
      }
      await propertyRepo.delete(id);
      return h.response().code(204);
    } catch (error) {
      request.log(["error", "property"], error);
      return Boom.badImplementation("Failed to delete property.");
    }
  }
}
