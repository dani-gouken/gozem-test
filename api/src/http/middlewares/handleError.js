import ValidationError from "../../errors/validationError.js";

export default function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let status = 500;
  let body = { message: "Server error" };

  if (err instanceof ValidationError) {
    status = 422;
    body.message = err.message;
  }
  console.error(err);
  res.status(status).json(body);
  return next();
}
