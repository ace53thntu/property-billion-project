import Joi from "joi";

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

export const createCountryValidator = CountryInputValidator.tailor("create");
export const updateCountryValidator = CountryInputValidator.tailor("update");

export const countryParamsValidator = Joi.object({
  countryId: Joi.number().integer(),
});
