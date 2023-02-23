const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DATE } = require('sequelize');

// This file includes all functions listed in order.
// Get All Current User's Bookings
// Edit a Booking
// Delete a Booking



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



// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    return res
    .status(404)
    .json({
      message: "Booking couldn't be found",
      statusCode: res.statusCode
    });
  };

  const { startDate, endDate } = req.body;
  const reqStartDate = new Date(startDate).getTime();
  const reqEndDate = new Date(endDate).getTime();
  const oldStartDate = new Date(booking.startDate).getTime();
  const oldEndDate = new Date(booking.endDate).getTime();
  const currentDate = new Date().getTime();

  if (reqEndDate <= reqStartDate) {
    return res
    .status(400)
    .json({
      message: 'Validation Error',
      statusCode: res.statusCode,
      errors: [{
        endDate: 'endDate cannot come before startDate'
      }]
    });
  };

  if (reqEndDate < currentDate) {
    return res
    .status(403)
    .json({
      message: "Past bookings can't be modified",
      statusCode: res.statusCode
    });
  };

  if (oldStartDate >= reqStartDate && oldEndDate <= reqEndDate || oldStartDate <= reqStartDate && oldEndDate >= reqEndDate) {
    return res
    .status(403)
    .json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: res.statusCode,
      errors: [{
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
      }]
    });
  };

  booking.startDate = startDate;
  booking.endDate = endDate;
  booking.save();

  return res.json(booking);
});



// Delete a Booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const { bookingId } = req.params;
  const userId = req.user.id;
  const bookings = await Booking.findByPk(bookingId);
  const newStartDate = new Date().toISOString().slice(0, 10)

  if(!bookings){
    return res.status(404).json({
      "message": "Booking Couldn't be found",
      "statusCode": 404
    })
  }

  if(bookings.dataValues.startDate <= newStartDate){
    return res.status(403).json({
      "message": "Bookings that have been started can't be deleted",
      "statusCode": 403
    })
  }

  if(userId !== bookings.userId){
    return res.status(403).json({
      "message": "Forbidden",
      "statusCode": 403
    })
  }
  await bookings.destroy()

  return res.status(200).json({
    "message": "Successfully Deleted",
    "statusCode": 200
  })
});


module.exports = router;
