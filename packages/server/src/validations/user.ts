import Joi from "joi";

const userInputValidator = Joi.object({
  firstName: Joi.string()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("The first name of user."),
  lastName: Joi.string()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    })
    .description("The last name of user."),
  phone: Joi.string()
    .alter({
      create: (schema) => schema.optional(),
      update: (schema) => schema.optional(),
    })
    .description("The phone number of user."),
  email: Joi.string()
    .email()
    .alter({
      create: (schema) => schema.required(),
      update: (schema) => schema.optional(),
    }),
  status: Joi.boolean().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  password: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.optional(),
  }),
  address1: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  address2: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
  gender: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
});

export const createUserValidator = userInputValidator.tailor("create");
export const updateUserValidator = userInputValidator.tailor("update");

export const userParamsValidator = Joi.object({
  userId: Joi.number().integer(),
});
