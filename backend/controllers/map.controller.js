const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  const { address } = req.query;

  if (!address || address.trim() === "") {
    return res.status(400).json({
      message: "Address is required",
    });
  }

  try {
    const coordinates = await mapService.getAddressCoordinate(address);

    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Map error:", error.message);

    res.status(400).json({
      message: error.message || "Coordinates not found",
    });
  }
};

module.exports.getDistanceTime = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }

  try {
    const { origin, destination } = req.query;

    const originCoords = await mapService.getAddressCoordinate(origin);

    const destinationCoords =
      await mapService.getAddressCoordinate(destination);

    const distanceTime = await mapService.getDistanceTime(
      originCoords,
      destinationCoords,
    );

    res.status(200).json(distanceTime);
  } catch (error) {
    console.error("Distance Time Error:", error.message);

    res.status(400).json({
      message: error.message || "Distance and time not found",
    });
  }
};

module.exports.getSuggestions = async (req, res) => {

  try {
    const { input } = req.query;

    const suggestions = await mapService.getSuggestions(input);

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};