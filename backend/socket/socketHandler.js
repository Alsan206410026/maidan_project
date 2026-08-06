// socket/socketHandler.js

const {
  addUser,
  removeUser,
} = require("./userSocketMap");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user after frontend connects
    socket.on("register", (userId) => {
      // Save userId inside socket
      socket.userId = userId;

      // Store userId -> socketId
      addUser(userId, socket.id);

      console.log(
        `User Registered: ${userId} -> ${socket.id}`
      );
    });

    // Disconnect
    socket.on("disconnect", () => {
      if (socket.userId) {
        removeUser(socket.userId);

        console.log(
          `User Disconnected: ${socket.userId}`
        );
      }

      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;