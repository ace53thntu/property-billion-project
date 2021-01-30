import { Constants } from "@config/constants";
import Joi from "joi";

export const queryValidator = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(Constants.PAGINATION.DEFAULT_LIMIT),
  page: Joi.number()
    .integer()
    .optional()
    .default(Constants.PAGINATION.DEFAULT_PAGE),
}).options({
  stripUnknown: true,
});
