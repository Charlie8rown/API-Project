const { check } = require('express-validator');
const { handleValidationErrors, handleValidationCreatSpot } = require('../../utils/validation');



// Handles errors if any of the attributes are empty for created spots and when editing a spot.
const validateCreatedSpots = [
  check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("State is required"),
  check('country')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Country is required"),
  check('lat')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Longitude is not valid"),
  check('name')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true})
    .notEmpty()
    .withMessage("Price per day is required"),
    handleValidationCreatSpot
  // handleValidationErrors
]

const validateBookings = [
  check('startDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("A start date is required"),
  check('endDate')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("An end date is required"),
  handleValidationErrors
]

const validateQueryError = [
  check('page')
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be greater than or equal 1"),
  check('size')
    .exists({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Size must be greater than or equal to 1"),
]

const reviewValidateError = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationCreatSpot
  // handleValidationErrors
]


module.exports = { validateCreatedSpots,  validateBookings, validateQueryError, reviewValidateError};
