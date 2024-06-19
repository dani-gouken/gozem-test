import Joi from "joi";

export default Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});
