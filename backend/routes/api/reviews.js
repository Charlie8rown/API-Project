const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



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





module.exports = router;
