const express = require("express");
const router = express.Router();
const mapsController = require("../controllers/map.controller");
const { authuser } = require("../middlewares/auth.middleware");
const { query } = require("express-validator");




router.get(
  "/getCoordinates",
  query("address").isString().isLength({ min: 3 }),
  authuser,
  mapsController.getCoordinates,
);

router.get(
  "/getDistanceTime",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authuser,
  mapsController.getDistanceTime,
);

router.get(
  "/get-suggestions",
  query("input").isLength({ min: 2 }),
  authuser,
  mapsController.getSuggestions,
);

router.get("/test", (req, res) => {
  res.send("Maps route working");
});

module.exports = router;