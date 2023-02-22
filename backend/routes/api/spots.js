const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Review, SpotImage, Spot, ReviewImage, Booking } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { validateCreatedSpots, validateBookings, validateQueryError, reviewValidateError } = require("./validations");
const { Op } = require("sequelize");

// This file includes all functions listed in order.
// Get All Spots - with pagination and search feature



// Get All Spots
router.get("/", validateQueryError, async (req, res, next) => {
  let { page, size, maxLat, minLat, maxLng, maxPrice, minPrice } = req.query;
  if (!page) page = 1;
  if (!size) size = 20;

  size = parseInt(size);
  page = parseInt(page);
  maxPrice = parseInt(maxPrice);
  minPrice = parseInt(minPrice);
  maxLat = parseInt(maxLat);
  minLat = parseInt(minLat);
  maxLng = parseInt(maxLng);

  const pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  let optionalParameter = {
    where: {},
  };
  if (maxPrice)
    optionalParameter.where.price = {
      [Op.lte]: maxPrice,
    };

  if (minPrice) {
    optionalParameter.where.price = {
      [Op.gte]: minPrice,
    };
  }
  if (maxLat) {
    optionalParameter.where.lat = {
      [Op.lte]: maxLat,
    };
  }
  if (minLat) {
    optionalParameter.where.lat = {
      [Op.gte]: minLat,
    };
  }

  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
    where: optionalParameter.where,
    limit: pagination.limit,
    offset: pagination.offset,
  });

  let arr = [];
  spots.forEach((spot) => {
    arr.push(spot.toJSON());
  });

  for (let i = 0; i < arr.length; i++) {
    let spot = arr[i];

    const reviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
      attributes: {
        attributes: ["stars"],
        raw: true,
      },
    });
    spot.SpotImages.forEach((img) => {
      if (img.preview === true) {
        spot.previewImage = img.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = "null";
    }
    let countRating = 0;
    spot.Reviews.forEach((element) => {
      countRating += element.stars;
    });
    let average = countRating / reviews.length;
    if (!spots.previewImage) {
      spots.previewImage = "No image found";
    } else {
      spot.avgRating = average;
    }
    if (!spot.avgRating) {
      spot.avgRating = "No reviews are found";
    }
    delete spot.SpotImages;
    delete spot.Reviews;
  }
  res.json({
    Spots: arr,
    page,
    size,
  });
});


module.exports = router;
