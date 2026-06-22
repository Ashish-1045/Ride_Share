const captainModel = require("../models/captain.model");

module.exports.CreateCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}) => {
  console.log("Service received:", { fullname, email, password, vehicle });

  if (
    !fullname ||
    !fullname.firstname ||
    !fullname.lastname ||
    !email ||
    !password ||
    !vehicle ||
    !vehicle.color ||
    !vehicle.plate ||
    vehicle.capacity == null ||
    !vehicle.vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    fullname,
    email,
    password,
    vehicle,
  });

  return captain;
};
