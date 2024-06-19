import Joi from "joi";
export default function (schema) {
  return function (req, res, next) {
    const { error } = Joi.object(schema).validate(req.params);
    if (error) {
      return res.status(422).json({
        message: error.message,
        errors: error.details,
      });
    }
    next();
  };
}
