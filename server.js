const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
// const MONGODB_URI = process.env.MONGODB_URI;

const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: dev ? "http://localhost:3000" : "https://chatwave-pro.vercel.app",
      methods: ["GET", "POST"],
    },
    connectionStateRecovery: {
      // ignoreKeepAlives: false,
      // maxInterval: 10000,
      // maxReconnectionDelay: 5000,
      // reconnectionDelayGrowFactor: 1.5,
    },
  });

  const users = {};

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    const roomIds = socket.handshake.query.roomIds;

    // if (!userId || !Array.isArray(roomIds)) {
    //   return socket.disconnect();
    // }

    if (userId) {
      users[userId] = socket.id;
    }

    io.emit('online', Object.keys(users));

    console.log(`User connected: ${userId}${users[userId] ? ` (${users[userId]})` : ""}`);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      delete users[userId];
      io.emit('online', Object.keys(users));
    });

    socket.on("message", (data) => {
      const { receiver } = data;
      console.log(data)
      const recipientSocketId = users[receiver._id?.toString()];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message", data);
      }
    });

    socket.on("typing", (data) => {
      const recipientSocketId = users[data.receiverId];
      
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("typing", data);
        console.log(data)
      }
    });

    socket.on("stopTyping", (data) => {
      io.to(users[data._id]).emit("stopTyping", data);
    });

    socket.on("joinRoom", (newRoomId) => {
      socket.join([...roomIds]);
      if (newRoomId) {
        socket.join(newRoomId);
      }
    });

    socket.on("leaveRoom", () => {
      socket.leave([...roomIds]);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  })

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server started on port 3000");
  });
});
