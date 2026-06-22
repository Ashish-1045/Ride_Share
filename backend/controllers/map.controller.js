const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const { address } = req.query;


  if (!address || address.trim() === "") {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error("Map error:", error.message);
    res.status(400).json({ message: error.message || "Coordinates not found" });
  }
};
