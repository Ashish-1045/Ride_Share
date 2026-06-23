const rideModel = require("../models/ride.model");
const mapsService = require("../services/maps.service");

function computeFare(distanceKm, durationMinutes, vehicleType) {
  const pricing = {
    car: {
      base: 50,
      perKm: 15,
      perMinute: 2,
    },
    motorcycle: {
      base: 30,
      perKm: 10,
      perMinute: 1.5,
    },
    auto: {
      base: 40,
      perKm: 12,
      perMinute: 1.8,
    },
  };

  const vehicle = pricing[vehicleType];

  if (!vehicle) {
    throw new Error("vehicleType must be one of car, motorcycle, or auto");
  }

  const fare =
    vehicle.base +
    vehicle.perKm * distanceKm +
    vehicle.perMinute * durationMinutes;

  return Number(fare.toFixed(2));
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  try {
    if (!user) {
      throw new Error("User is required");
    }

    if (!pickup || !destination) {
      throw new Error("Pickup and destination are required");
    }

    if (!vehicleType || !["car", "motorcycle", "auto"].includes(vehicleType)) {
      throw new Error("vehicleType must be one of car, motorcycle, or auto");
    }

   
    const pickupCoords = await mapsService.getAddressCoordinate(pickup);

    const destinationCoords =
      await mapsService.getAddressCoordinate(destination);

    const distanceTime = await mapsService.getDistanceTime(
      pickupCoords,
      destinationCoords,
    );


    const fare = computeFare(
      Number(distanceTime.distanceKm),
      Number(distanceTime.durationMinutes),
      vehicleType,
    );

    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      fare,
      distance: distanceTime.distanceKm,
      duration: distanceTime.durationMinutes,
      status: "pending",
    });

    return ride;
  } catch (error) {
    throw error;
  }
};
