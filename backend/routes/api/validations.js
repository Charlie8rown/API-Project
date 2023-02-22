const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateQueryError = [
  check('page')
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal 1"),
  check('size')
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1")
]

module.exports = { validateCreatedSpots,  validateBookings, validateQueryError, reviewValidateError};
