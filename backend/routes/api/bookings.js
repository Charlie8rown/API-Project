const express = require('express')
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require('../../db/models');

// This file includes all functions listed in order.
// Get All Current User's Bookings
// Edit a Booking
// Delete a Booking



// Get All Current User's Bookings
router.get('/current', requireAuth, async(req, res, next) => {
  const currUser  = req.user
  // console.log(currUser);
  const bookings = await currUser.getBookings({

    include: [{
      model: Spot,
      attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"],
      include: [{
        model: SpotImage,
        attributes: ["url", "preview"]
      }]
    }]
  });

  if(bookings.length === 0) {
    return res.json({ message: "No booking for current user" })
  }

  const bookingslist = [];

  for (let i = 0; i < bookings.length; i++) {
    let currBooking = bookings[i];
    let currBookingJSON = currBooking.toJSON();

    if (currBookingJSON.Spot.SpotImages.length > 0) {
      for (let j = 0; j < currBookingJSON.length > 0; j++)  {

        if (currBookingJSON.Spot.SpotImages[i].preview === true) {
          currBookingJSON.Spot.previewImage = currBookingJSON.Spot.SpotImages[i].url
        }
      }
    }
    if (!currBookingJSON.Spot.previewImage) {
      currBookingJSON.Spot.previewImage = null
    }
    delete currBookingJSON.Spot.SpotImages;
    currBookingJSON.startDate = currBookingJSON.startDate.split(" ")[0]
    currBookingJSON.endDate = currBookingJSON.endDate.split(" ")[0]
    bookingslist.push(currBookingJSON)
  }

  res.json({ Bookings: bookingslist });
});



// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
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
    const err = new Error("Validation Error")
    err.status = 400
    err.title = "Validation Error"
    err.message = "Validation Error"
    err.statusCode = 400
    err.errors = { endDate: "endDate cannot come before startDate" }
    return next(err)
    return res

  };

  if (reqEndDate < currentDate) {
    const err = new Error("Past bookings can't be modified")
    err.status = 403
    err.title = "Past bookings can't be modified"
    err.message = "Past bookings can't be modified"
    err.statusCode = 403
    return next(err)
  };

  if (oldStartDate >= reqStartDate && oldEndDate <= reqEndDate || oldStartDate <= reqStartDate && oldEndDate >= reqEndDate) {
    const err = new Error("Sorry, this spot is already booked for the specified dates")
    err.status = 403
    err.title =
    err.message = "Sorry, this spot is already booked for the specified dates"
    err.statusCode = 403
    err.errors = { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" }
    return next(err)
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
    const err = new Error("Booking Couldn't be found");
      err.status = 404;
      err.title = "Booking Couldn't be found";
      err.message = "Booking Couldn't be found";
      return next(err);
  }

  if(bookings.dataValues.startDate <= newStartDate){
    const err = new Error("Bookings that have been started can't be deleted")
      err.status = 403
      err.title = "Bookings that have been started can't be deleted"
      err.message = "Bookings that have been started can't be deleted"
  }

  if(userId !== bookings.userId){
    const err = new Error("Require proper authorization");
      err.status = 403;
      err.title = "Require proper authorization";
      err.message = "Require proper authorization.";
      return next(err);
  }
  await bookings.destroy()

  return res.status(200).json({
    "message": "Successfully Deleted",
    "statusCode": 200
  })
});


module.exports = router;
