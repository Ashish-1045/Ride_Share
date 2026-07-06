const mapsService = require("../services/maps.service");
const rideService = require("../services/ride.service");
const { sendMessageToSocketId } = require("../socketio");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { pickup, destination, vehicleType } = req.body;

    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // OTP frontend ko mat bhejo
    ride.otp = "";

    // Pickup coordinates
    const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);

    // Nearby captains
    const captainInRadius = await mapsService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      50,
    );

    console.log("👥 Found captains:", captainInRadius.length);

    captainInRadius.forEach((captain) => {
      if (captain.socketId) {
        console.log("📤 Sending ride to captain:", captain._id);
        console.log("Socket:", captain.socketId);

        sendMessageToSocketId(captain.socketId, "new-ride", ride);
      }
    });

    return res.status(200).json(ride);
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

module.exports.confirmRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const ride = await rideService.confirmRide({
      rideId: req.body.rideId,
      captain: req.captain._id,
    });

    // User ko notify karo
    if (ride.user && ride.user.socketId) {
      sendMessageToSocketId(ride.user.socketId, "ride-confirmed", ride);
    }

    return res.status(200).json({
      message: "Ride confirmed successfully",
      ride,
    });
  } catch (error) {
    next(error);
  }
};
  