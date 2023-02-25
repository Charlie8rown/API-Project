const { check } = require('express-validator');
const { handleValidationErrors, handleValidationCreatSpot } = require('../../utils/validation');
const { Review, User } = require('../../db/models')



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
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true})
    .notEmpty()
    .isFloat({ min: -180, max: 180 })
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
    .isFloat({ min: 1 })
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
    .isInt({ min: 1, max: 5 })
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationCreatSpot
  // handleValidationErrors
]

const ValidateReviewImage = [
  check('url')
    .notEmpty()
    .withMessage('Must provide image url'),
  handleValidationErrors
];


const validateReviewExist = async (req, res, next) => {
  const { reviewId } = req.params;
  const reviews = await Review.findByPk(reviewId)

  if(!reviews) {
    const err = new Error("Review couldn't be found")
    err.title = "Review couldn't be found"
    err.status = 404;
    err.message = "Review couldn't be found"
    err.statusCode = 404
    return next(err)
  }
  return next()
}

const validateReviewByUser = async (req, res, next) => {
  const { reviewId } = req.params;
  const reviews = await Review.findByPk(reviewId)
  const user = req.user

  if (user.id !== reviews.userId) {
    const err = new Error("Authorization required")
    err.title = "Authorization required"
    err.status = 403
    err.message = "Authorization required"
    err.statusCode = 403
    return next(err)
  }
  return next()
}

module.exports = {
  validateCreatedSpots,
  validateBookings,
  validateQueryError,
  reviewValidateError,
  ValidateReviewImage,
  validateReviewExist,
  validateReviewByUser
};
