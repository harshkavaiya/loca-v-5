const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// We export a function that will run when Vercel calls our API route
export default (req, res) => {
  // This prevents Vercel from timing out
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO");

    const io = socketIo(res.socket.server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
      console.log("New client connected");

      // Receive location updates from delivery boy
      socket.on("sendLocation", (data) => {
        // Broadcast the location to the user
        socket.broadcast.emit("receiveLocation", data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};
