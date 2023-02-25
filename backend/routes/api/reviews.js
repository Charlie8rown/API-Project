const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { reviewValidateError, ValidateReviewImage, validateReviewExist, validateReviewByUser } = require("./validations");

// This file includes all functions listed in order.
// Get all reviews of Current User
// Create an Image for a Review   // Add an image to a review based on the review's id
// Edit a Review
// Delete a Review


// Get all reviews of Current User
router.get('/current', requireAuth, async (req, res, next) => {

  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        include: [{
          model: SpotImage,
          attributes: ['url', 'preview']
        }]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  if (reviews.length === 0) {
    const err = new Error("No review by user")
    err.status = 200
    err.title = "No review by user"
    err.message = "No review by user"
    err.statusCode = 200

    return next(err)
  }

  const allReviews = []

  for (let i = 0; i < reviews.length; i++)  {
    let reviewjson = reviews[i].toJSON()
    // console.log(reviewjson.Spot); // shows all information for Spot
    if (reviewjson.Spot.SpotImages.length > 0) {

      for (let j = 0; j < reviewjson.Spot.SpotImages.length; j++) {

        if (reviewjson.Spot.SpotImages[j].preview) {
          reviewjson.Spot.previewImage = reviewjson.Spot.SpotImages[j].url
        }
      }
    }
    if(!reviewjson.Spot.previewImage) {
      reviewjson.Spot.previewImage = null
    }

    if(!reviewjson.ReviewImages.length) {
      reviewjson.ReviewImages = null
    }

    delete reviewjson.Spot.SpotImages;
    allReviews.push(reviewjson);
  }
  res.json({ Reviews: allReviews })

});


// Create an Image for a Review   // Add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, validateReviewExist, validateReviewByUser, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  const { url } = req.body;


  const images = await ReviewImage.findAll({
    where: {
      reviewId: req.params.reviewId
    }
  });

  if (images.length  >= 10) {
    const err = new Error("Maximum number of images for this resource was reached");
    err.status = 404;
    err.title = "Maximum number of images for this resource was reached";
    err.message = "Maximum number of images for this resource was reached";
    err.statusCode = 404;
    return next(err);
  };

  const image = await ReviewImage.create({
    reviewId: req.params.reviewId,
    url
  });
  const result  = await ReviewImage.findOne({
    where: {
      url:url
    },
    attributes:['id','url']
  });
  return res.json(result);
});


// Edit a Review
router.put('/:reviewId', requireAuth, validateReviewExist, validateReviewByUser, reviewValidateError, async (req, res, next) => {
  const { reviewId } = req.params
  const { review, stars } = req.body

  let editedReview = await Review.findByPk(reviewId)

  editedReview.review = review
  editedReview.stars = stars
  await editedReview.save()
  res.json(editedReview)
})



// Delete a Review
router.delete('/:reviewId', requireAuth, validateReviewExist, validateReviewByUser, async(req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  await review.destroy();
  res.status(200).json({
    message: "Review deleted successfully",
    statusCode: 200
  })
  next(err);

});



module.exports = router;
