const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// This file includes all functions listed in order.
// Get all Reviews of Current User
// Create an Image for a Review   // Add an image to a review based on the review's id



// Get all Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {
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
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });
  for (let i = 0; i < reviews.length; i++) {
    console.log(reviews.Spot);
    let review = reviews[i].toJSON();
    if (!review.Spot) {
      review.Spot = { previewImage: 'None available!' };
    } else {
      if (!review.Spot.SpotImages) {
        review.Spot.previewImage = 'None available!';
      } else {
        let imageURL = review.Spot.SpotImages[0];

        if (!imageURL) {
          review.Spot.previewImage = 'None available!';
        } else {
          review.Spot.previewImage = imageURL.url;
        }

        delete review.Spot.SpotImages;
      }
    }
    reviews[i] = review;
  }
  return res.json({ Reviews: reviews });
});


// Create an Image for a Review   // Add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);

  if (!review) {
    return res
      .status(404)
      .json({
        message: "Review couldn't be found",
        statusCode: res.statusCode
      });
  };
  const { url } = req.body;
  const images = await ReviewImage.findAll({
    where: {
      reviewId: req.params.reviewId
    }
  });

  if (images.length > 9) {
    return res
      .status(403)
      .json({
        message: "Maximum number of images for this resource was reached",
        statusCode: res.statusCode
      });
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




module.exports = router;
