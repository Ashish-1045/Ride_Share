const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const ridecontroller = require("../controllers/ride.controller");
const { authuser } = require("../middlewares/auth.middleware");

router.post(
  "/create",
  authuser,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup Location"),

  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid Vehicle Type"),

  ridecontroller.createRide,
);

module.exports = router;
