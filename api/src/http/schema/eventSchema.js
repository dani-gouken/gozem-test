import Joi from "joi";
import locationSchema from "./locationSchema.js";
import { DeliveryStatus } from "../../database/models/delivery.js";

export const eventSchema = Joi.object({
  event: Joi.string().required(),
  payload: Joi.object().required(),
});

export const locationChangedSchema = Joi.object({
  delivery_id: Joi.string().uuid().required(),
  location: locationSchema.required(),
});

export const statusChangedSchema = Joi.object({
  delivery_id: Joi.string().uuid().required(),
  status: Joi.string().valid(...DeliveryStatus.cases()),
});
