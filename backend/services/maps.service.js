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
          "User-Agent": "RideShare-App",
        },
      },
    );

    if (!response.data.length) {
      throw new Error("Address not found");
    }

    return {
      lat: response.data[0].lat,
      lng: response.data[0].lon,
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  try {
    const response = await axios.get(
      `http://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
      {
        params: {
          overview: "false",
        },
      },
    );

    const route = response.data.routes[0];

    const durationInSeconds = route.duration;

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);

    let durationText = "";

    if (hours > 0) {
      durationText = `${hours} hr ${minutes} min`;
    } else {
      durationText = `${minutes} min`;
    }

    return {
      distance: `${(route.distance / 1000).toFixed(1)} km`,
      distanceKm: Number((route.distance / 1000).toFixed(1)),
      duration: durationText,
      durationMinutes: Math.ceil(durationInSeconds / 60),
    };
  } catch (error) {
    throw error;
  }
};

module.exports.getSuggestions = async (input) => {
  try {
    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/autocomplete",
      {
        params: {
          text: input,
          limit: 5,
          apiKey: process.env.GEOAPIFY_API_KEY,
        },
      },
    );

  return response.data.features.map((place) => ({
    displayName: place.properties.formatted,
    fullAddress: place.properties.formatted,
    lat: place.properties.lat,
    lng: place.properties.lon,
  }));
  } catch (error) {
    console.error(error.response?.data || error);
    throw new Error("Unable to fetch suggestions");
  }
};