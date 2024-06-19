import Joi from "joi";
import locationSchema from "./locationSchema.js";

export const updatePackageSchema = Joi.object({
  description: Joi.string(),
  weight: Joi.number().positive(),
  width: Joi.number().positive(),
  depth: Joi.number().positive(),

  from_name: Joi.string(),
  from_address: Joi.string(),
  from_location: locationSchema,

  to_name: Joi.string(),
  to_address: Joi.string(),
  to_location: locationSchema,
});

export default Joi.object({
  description: Joi.string().required(),
  weight: Joi.number().positive().required(),
  width: Joi.number().positive().required(),
  depth: Joi.number().positive().required(),

  from_name: Joi.string().required(),
  from_address: Joi.string().required(),
  from_location: locationSchema.required(),

  to_name: Joi.string().required(),
  to_address: Joi.string().required(),
  to_location: locationSchema.required(),
});
