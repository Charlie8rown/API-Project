const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DATE } = require('sequelize');

// This file includes all functions listed in order.
// Get All Current User's Bookings




// Get All Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
  const userId  = req.user.id

  const bookings = await Booking.findAll({
    where: {
      userId: userId
    },
    include: {
      model: Spot,
      attributes: [
        "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"
      ]
    },
    attributes: ["id", "spotId", "userId", "startDate", "endDate", "createdAt", "updatedAt"]
  });

  const spots = await Spot.findAll({
    include: {
      model: SpotImage,
      // where: { preview: true },
      // attributes: ['url']
    },
  });

  let ele = []

  spots.forEach(element => {
    ele.push(element.toJSON())
  });

  bookings.forEach(booking => {
    console.log(booking.dataValues.startDate)
    let spot = spots.find(sp => sp.id === booking.spotId);
    booking.Spot.dataValues.previewImage = spot?.SpotImages[0]?.url;
  });

  const bookingsJSON = bookings.map(booking => {
    const bookingJSON = booking.toJSON();

    if (bookingJSON.startDate) {
      bookingJSON.startDate = bookingJSON.startDate.toLocaleString();
    }

    if (bookingJSON.endDate) {
      bookingJSON.endDate = bookingJSON.endDate.toLocaleString();
    }
    return bookingJSON;
  });

    res.json({ Bookings: bookingsJSON });
});



module.exports = router;
