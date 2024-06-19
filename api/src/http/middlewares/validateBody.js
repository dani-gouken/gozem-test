import Joi from "joi";
export default function (schema, cb) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json({
        message: error.message,
        errors: error.details,
      });
    }
    return cb(req, res, next);
  };
}
