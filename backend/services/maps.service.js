// const axios = require("axios");

// module.exports.getAddressCoordinate = async (address) => {
//   try {
//     const response = await axios.get(
//       "https://nominatim.openstreetmap.org/search",
//       {
//         params: {
//           q: address,
//           format: "json",
//           limit: 1,
//         },
//         headers: {
//           "User-Agent": "MERN-Uber-Clone/1.0",
//         },
//       },
//     );

//     if (!response.data || response.data.length === 0) {
//       throw new Error("Address not found");
//     }

//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   } catch (error) {
//     console.error("Error getting coordinates:", error.message);
//     throw error;
//   }
// };

// module.exports.getDistanceTime = async (origin, destination) => {
//   try {
//     const response = await axios.get(
//       `http://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`,
//       {
//         params: {
//           overview: "false",
//         },
//       }
//     );

//     if (!response.data.routes || response.data.routes.length === 0) {
//       throw new Error("Distance and time not found");
//     }

//     return {
//       distance: response.data.routes[0].distance, // meters
//       duration: response.data.routes[0].duration, // seconds
//     };
//   } catch (error) {
//     console.error("Error getting distance and time:", error.message);
//     throw error;
//   }
// };

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

    if (!response.data.routes?.length) {
      throw new Error("Distance and time not found");
    }

    return {
      distance: response.data.routes[0].distance,
      duration: response.data.routes[0].duration,
    };
  } catch (error) {
    throw error;
  }
};