const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());

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

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
