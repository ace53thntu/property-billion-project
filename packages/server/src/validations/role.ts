import Joi from "joi";

const roleInputValidator = Joi.object({
  name: Joi.string().alter({
    create: (schema) => schema.required(),
    update: (schema) => schema.required(),
  }),
  description: Joi.string().alter({
    create: (schema) => schema.optional(),
    update: (schema) => schema.optional(),
  }),
});

export const createRoleValidator = roleInputValidator.tailor("create");
export const updateRoleValidator = roleInputValidator.tailor("update");

export const roleParamsValidator = Joi.object({
  roleId: Joi.number().integer(),
});
