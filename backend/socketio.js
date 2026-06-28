const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function InitializeSokect(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", async (data) => {
      console.log("✅ Join received:", data);
      const { userType, userId } = data;
      if (!userId || !userType) return;
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        console.log(`✅ User ${userId} socketId updated`);
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id }); // ✅ captainModel
        console.log(`✅ Captain ${userId} socketId updated`);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          type: "Point",
          coordinates: [location.lng, location.ltd],
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
}

function sendMessageToSocketId(socketId, eventName, data) {
  if (!io) {
    return false;
  }
  io.to(socketId).emit(eventName, data);
  return true;
}

module.exports = {
  InitializeSokect,
  sendMessageToSocketId,
};
