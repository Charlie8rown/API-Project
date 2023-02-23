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
// Get all Spots owned by the Current User
// Get Details for a spot from an Id
// Create a Spot
// Add an Image to a Spot based on the Spot's id // Create an Image for a Spot




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


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
      where: {
        ownerId: req.user.id
      }
  });

  const spotsArray = [];

  for (let i = 0; i < spots.length; i++) {
      let currentSpot = spots[i].toJSON();
      const starTotal = await Review.sum('stars', { where: { spotId: currentSpot.id } });
      const reviewTotal = await Review.count({ where: { spotId: currentSpot.id } });

      if (!starTotal) {
        currentSpot.avgRating = 0;
      } else {
        currentSpot.avgRating = (starTotal / reviewTotal).toFixed(1);
      }

      const image = await SpotImage.findOne({
        where: {
          [Op.and]: [
            { spotId: currentSpot.id },
            { preview: true }
          ]
        }
      });

      if (!image) {
        currentSpot.previewImage = 'No images!'
      } else {
        currentSpot.previewImage = image.url
      }

      spotsArray.push(currentSpot);
    }
    return res.json({ Spots: spotsArray });
});


// Get Details for a spot from an Id
router.get('/:spotId', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
      include: [
        {
          model: User, as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        }
      ]
    });

  if (!spot) {
  return res
      .status(404)
      .json({
          message: "Spot couldn't be found",
          statusCode: res.statusCode
      })
  };

  const reviewCount = await Review.count({ where: { spotId: spot.id } });

  const starTotal = await Review.sum('stars', {
  where: { spotId: spot.id }
  });

  const spotJSON = spot.toJSON();

  if (!starTotal) {
  spotJSON.avgStarRating = 0
  } else {
  spotJSON.avgStarRating = (starTotal / reviewCount).toFixed(1);
  spotJSON.numReviews = reviewCount;
  }
  return res.json(spotJSON)
});


// Create a Spot
router.post("/", requireAuth, validateCreatedSpots, async (req, res) => {
  const id = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const createdSpot = await Spot.create({
    ownerId: id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  if (createdSpot) {
    res.status(201);
    res.json(createdSpot);
  }
});


// Add an Image to a Spot based on the Spot's id // Create an Image for a Spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const err = {};
      err.title = "Spot couldn't be found";
      err.status = 404;
      err.errors = ["Spot couldn't be found"];
      err.statusCode = 404;
      return next(err);
    }
    if (req.user.id !== spot.ownerId) {
      const err = {};
      err.title = "Require proper authorization";
      err.status = 403;
      err.errors = {
        message: "Forbidden",
      };
      err.statusCode = 403;
      return next(err);
    }
    const img = await SpotImage.create({
      spotId: spotId,
      url,
      preview,
    });
    return res.json({
      id: img.id,
      url: img.url,
      preview: img.preview,
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;
