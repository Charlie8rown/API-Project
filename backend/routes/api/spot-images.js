const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');



// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId);

  if (!image) {
    return res
      .status(404)
      .json({
        message: "Spot Image couldn't be found",
        statusCode: res.statusCode
      });
  };

  await image.destroy();

  return res
    .status(200)
    .json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    });
});

module.exports = router;
