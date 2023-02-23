const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');



// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const reviewImageId = req.user.id;
  const reviewImage = await ReviewImage.findByPk(imageId);
  const allReviews = await Review.findAll();


  if(!reviewImage){
    return res.status(404).json({
      "message": "Review Image couldn't be found",
      "statusCode": 404
    })
  }

  let userId;
  allReviews.forEach(review => {
    userId = review.userId;
  })

  if(reviewImageId !== userId){
    return res.status(403).json({
      "message": "Authorization Error",
      "statusCode": 403
    })
  }
  await reviewImage.destroy()

  return res.status(200).json({
    "message": "Successfully Deleted",
    "statusCode": 200
  })
});





module.exports = router;
