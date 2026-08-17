const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { query } = require("express-validator");
const ridecontroller = require("../controllers/ride.controller");
const { authuser } = require("../middlewares/auth.middleware");
const { authCaptain } = require("../middlewares/auth.middleware");

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

router.get(
  "/getfare",

  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup Location"),

  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination"),

  ridecontroller.getfare,
);

router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  ridecontroller.confirmRide,
);

router.post(
  "/start-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  body("otp").isLength({ min: 6, max: 6 }).withMessage("Invalid OTP"),
  ridecontroller.startRide,
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid Ride ID"),
  ridecontroller.endRide,
);
module.exports = router;
