import Joi from "joi";
import JoiDate from "@joi/date";
Joi.extend(JoiDate);

import { DeliveryStatus } from "../../database/models/delivery.js";
import locationSchema from "./locationSchema.js";

export default Joi.object({
  package_id: Joi.string().uuid().required(),
  pickup_time: Joi.date().required(),
  start_time: Joi.date().required(),
  end_time: Joi.date().required(),
  location: locationSchema.required(),
  status: Joi.string()
    .valid(...DeliveryStatus.cases())
    .required(),
});

export const storeDeliverySchema = Joi.object({
  package_id: Joi.string().uuid().required(),
});

export const updateDeliverySchema = Joi.object({
  location: locationSchema,
  status: Joi.string().valid(...DeliveryStatus.cases()),
});
