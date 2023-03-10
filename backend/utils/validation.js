const { validationResult } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

const handleValidationError = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.title = "Validation Error";
    next(err);
  }
  next();
};

const handleValidationCreatSpot = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    const err = Error("Validation Error");
    err.errors = errors;
    err.status = 400;
    err.statusCode = err.status;
    err.title = "Invalid Input";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
  handleValidationError,
  handleValidationCreatSpot

};
