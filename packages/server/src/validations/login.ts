import Joi from "joi";

export const loginInputValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
