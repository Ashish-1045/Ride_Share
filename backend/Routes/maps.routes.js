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

router.get('/getDistanceTime')

module.exports = router;
