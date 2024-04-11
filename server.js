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

  const io = new Server(httpServer);

  const users = {};

  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;

    if (username) {
      users[username] = socket.id;
    }
    console.log(`User connected: ${username}`);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("sendMessage", ({ sender, recipient, message }) => {
      const recipientSocketId = users[recipient._id];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", { sender, message });
      }
    });

    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);

      console.log(data);
    });

    socket.on("stopTyping", (data) => {
      socket.broadcast.emit("stopTyping", data);
    });

    socket.on("joinRoom", (username) => {
      socket.join(users[username]);
    });

    socket.on("leaveRoom", (username) => {
      socket.leave(users[username]);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  })

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server started on port 3000");

    // try {
    //   await mongoose.connect(MONGODB_URI, {
    //     dbName: "chatwave",
    //     bufferCommands: false,
    //   });
    //   console.log("Connected to the database");
    // } catch (error) {
    //   throw error;
    // }
  });
});
