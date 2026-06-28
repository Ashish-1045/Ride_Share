const mapsService = require("../services/maps.service");
const rideService = require(`../services/ride.service`);
const { validationResult } = require("express-validator");
const { getfare } = require("../services/ride.service");
const { body } = require("express-validator");
const { query } = require("express-validator");

module.exports.createRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
    const captainInRadius = await getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      2,
    );

    console.log(pickupCoordinates);

    console.log(captainInRadius);

    res.status(200).json(ride);
  } catch (error) {
    next(error);
  }
};

module.exports.getfare = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { pickup, destination } = req.query;

    const pickupCoords = await mapsService.getAddressCoordinate(pickup);

    const destinationCoords =
      await mapsService.getAddressCoordinate(destination);

    const distanceTime = await mapsService.getDistanceTime(
      pickupCoords,
      destinationCoords,
    );

    const fare = {
      car: rideService.getfare(
        distanceTime.distanceKm,
        distanceTime.durationMinutes,
        "car",
      ),

      motorcycle: rideService.getfare(
        distanceTime.distanceKm,
        distanceTime.durationMinutes,
        "motorcycle",
      ),

      auto: rideService.getfare(
        distanceTime.distanceKm,
        distanceTime.durationMinutes,
        "auto",
      ),
    };

    return res.status(200).json(fare);
  } catch (error) {
    next(error);
  }
};
