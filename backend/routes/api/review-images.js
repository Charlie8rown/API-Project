const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');



// Delete a Review Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const { imageId } = req.params;
  const reviewImage = await ReviewImage.findByPk(imageId);
  const allReviews = await Review.findAll();

  if(!reviewImage){
    const err = new Error("Review Image couldn't be found")
    err.status = 404
    err.title = "Review Image couldn't be found"
    err.message = "Review Image couldn't be found"
    err.statusCode = 404
    return next(err)
  }

  const user = req.user
  const review = await reviewImage.getReview()


  if(review.userId !== user.id){
    const err = new Error("Authorization Error")
    err.status = 403
    err.title = "Authorization Error"
    err.message = "Authorization Error"
    err.statusCode = 403
    return next(err)
  }
  await reviewImage.destroy()

  return res.status(200).json({
    "message": "Successfully Deleted",
    "statusCode": 200
  })
});





module.exports = router;
