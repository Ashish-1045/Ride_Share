const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

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

          console.log(`✅ User ${userId} socketId updated`);
        }

        if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
          });

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
          { new: true }
        );

        console.log(
          "✅ Captain location saved:",
          updatedCaptain.location
        );
      } catch (err) {
        console.log("Location Update Error:", err.message);
      }
    });

    // =========================
    // DISCONNECT
    // =========================
    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
}

// =========================
// SEND MESSAGE
// =========================
function sendMessageToSocketId(socketId, eventName, data) {
    if (!io) return;

    console.log("📨 Emit:", eventName);
    console.log("Socket:", socketId);

    io.to(socketId).emit(eventName, data);
} 

module.exports = {
  InitializeSocket,
  sendMessageToSocketId,
};