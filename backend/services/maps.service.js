const axios = require("axios");

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "MERN-Uber-Clone/1.0",
        },
      },
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("Address not found");
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon),
    };
  } catch (error) {
    console.error("Error getting coordinates:", error.message);
    throw error;
  }
};