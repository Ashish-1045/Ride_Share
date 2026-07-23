const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;
const activeSocketConnections = new Map();
const socketToIdentity = new Map();

function storeSocketConnection(userType, userId, socketId) {
  if (!userType || !userId || !socketId) return;

  activeSocketConnections.set(`${userType}:${userId}`, socketId);
  socketToIdentity.set(socketId, { userType, userId });
}

function removeSocketConnection(socketId) {
  const identity = socketToIdentity.get(socketId);
  if (!identity) return;

  activeSocketConnections.delete(`${identity.userType}:${identity.userId}`);
  socketToIdentity.delete(socketId);
}

function getSocketIdForUser(userType, userId) {
  return activeSocketConnections.get(`${userType}:${userId}`) || null;
}

function InitializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // =========================
    // JOIN EVENT
    // =========================
    socket.on("join", async (data) => {
      try {
        console.log("✅ Join received:", data);

        const { userType, userId } = data;

        if (!userId || !userType) return;

        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          storeSocketConnection(userType, userId, socket.id);
          console.log(`✅ User ${userId} socketId updated`);
        }

        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

          storeSocketConnection(userType, userId, socket.id);
          console.log(`✅ Captain ${userId} socketId updated`);
        }
      } catch (err) {
        console.log("Join Error:", err.message);
      }
    });

    // =========================
    // CAPTAIN LOCATION UPDATE
    // =========================
    socket.on("update-location-captain", async (data) => {
      try {
        console.log("📡 Received location update:", data);

        const { userId, location } = data;

        if (!userId || !location) {
          return socket.emit("error", {
            message: "Invalid data",
          });
        }

        const { lat, lng } = location;

        if (lat == null || lng == null) {
          return socket.emit("error", {
            message: "Invalid location",
          });
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          {
            location: {
              type: "Point",
              coordinates: [lng, lat], // MongoDB => [longitude, latitude]
            },
          },
          { new: true },
        );

        console.log("✅ Captain location saved:", updatedCaptain.location);
      } catch (err) {
        console.log("Location Update Error:", err.message);
      }
    });

    // =========================
    // SEND LOCATION (Real-time tracking)
    // =========================
    socket.on("send-location", (data) => {
      try {
        console.log("📍 Location received:", {
          userId: data.userId,
          userType: data.userType,
          latitude: data.latitude,
          longitude: data.longitude,
        });

        const { userId, userType, latitude, longitude, timestamp } = data;

        if (!userId || !userType || latitude == null || longitude == null) {
          return socket.emit("error", {
            message: "Invalid location data",
          });
        }

        // Broadcast location to all connected sockets
        // This sends to everyone who's listening
        io.emit("location-update", {
          userId,
          userType,
          latitude,
          longitude,
          timestamp: timestamp || new Date().toISOString(),
        });

        console.log(`✅ Location broadcasted for ${userType} ${userId}`);
      } catch (err) {
        console.log("Send Location Error:", err.message);
      }
    });

    // =========================
    // CAPTAIN LOCATION UPDATE (for ride tracking)
    // =========================
    socket.on("captain-location", (data) => {
      try {
        console.log("🚗 Captain location update:", data);

        const { userId, latitude, longitude } = data;

        if (!userId || latitude == null || longitude == null) {
          return socket.emit("error", {
            message: "Invalid captain location data",
          });
        }

        // Update captain location in database
        captainModel
          .findByIdAndUpdate(
            userId,
            {
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            },
            { new: true },
          )
          .then((updatedCaptain) => {
            console.log("✅ Captain location saved:", updatedCaptain.location);

            // Broadcast to all users waiting for this captain
            io.emit("captain-location", {
              captainId: userId,
              latitude,
              longitude,
              timestamp: new Date().toISOString(),
            });
          })
          .catch((err) => {
            console.log("Database update error:", err.message);
          });
      } catch (err) {
        console.log("Captain Location Error:", err.message);
      }
    });

    // =========================
    // RIDE STARTED (captain -> user)
    // =========================
    socket.on("ride-started", (rideData) => {
      try {
        console.log("🚀 Ride started event received:", rideData);

        const userId =
          rideData?.user?._id || rideData?.user || rideData?.userId;

        if (!userId) {
          console.log("⚠️ No user id found in ride data");
          return;
        }

        sendMessageToUser("user", userId, "ride-started", rideData);
      } catch (err) {
        console.log("Ride Started Error:", err.message);
      }
    });

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {
      removeSocketConnection(socket.id);
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
}

// =========================
// SEND MESSAGE
// =========================
function sendMessageToSocketId(socketId, eventName, data) {
  if (!io || !socketId) return;

  console.log("📨 Emit:", eventName);
  console.log("Socket:", socketId);

  io.to(socketId).emit(eventName, data);
}

function sendMessageToUser(userType, userId, eventName, data) {
  if (!io || !userType || !userId) return;

  const socketId = getSocketIdForUser(userType, userId);
  if (!socketId) {
    console.log("⚠️ No active socket found for", userType, userId);
    return;
  }

  sendMessageToSocketId(socketId, eventName, data);
}

module.exports = {
  InitializeSocket,
  sendMessageToSocketId,
  sendMessageToUser,
};
