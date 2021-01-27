import Joi from "joi";

const propertyInputValidator = Joi.object({
  title: Joi.string()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("Title of property."),
  description: Joi.string()
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    })
    .description("Description of property."),
  area: Joi.number()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("Area of property."),
  price: Joi.number()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("Price of property."),
  status: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  feeElectric: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  feeWater: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  feeOther: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  expiredAt: Joi.date().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  address: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  long: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  lat: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  slug: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  wardId: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  userId: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  propertyAudienceId: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  propertyTypeId: Joi.number().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
});

export const createUserValidator = propertyInputValidator.tailor("create");
export const updateUserValidator = propertyInputValidator.tailor("update");

export const propertyParamsValidator = Joi.object({
  id: Joi.number().integer(),
});
