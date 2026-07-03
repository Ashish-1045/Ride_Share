const mapsService = require("../services/maps.service");
const rideService = require(`../services/ride.service`);
const { sendMessageToSocketId } = require("../socketio");
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
    const captainInRadius = await mapsService.getCaptainInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      50,
    );

     ride.otp = ""

    // console.log(pickupCoordinates)
    // console.log(captainInRadius);
      
    captainInRadius.forEach((captain) => {
      if (captain.socketId) {
        console.log("📤 Sending ride to captain:", captain._id);

        sendMessageToSocketId(captain.socketId, {
          event: "new-ride",
          data: ride,
        });
      }
    });



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

module.exports.confirmRide = async (req, res, next) => {    
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  try{
    const ride = await rideService.confirmRide(req.body.rideId, req.captain._id);
    res.status(200).json({ message: "Ride confirmed successfully", ride })

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

  }catch(error){
    next(error);
  }
}