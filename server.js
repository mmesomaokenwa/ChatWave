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
      origin: "*",
    },
    allowEIO3: true,
    transports: ["websocket"],
    allowRequest: (req) => {
      return true; // Allow all requests for now
    },
    
  });

  const users = {};

  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    const roomIds = socket.handshake.query.roomIds;

    // if (!username || !Array.isArray(roomIds)) {
    //   return socket.disconnect();
    // }

    if (username) {
      users[username] = socket.id;
    }

    io.emit('online', Object.keys(users));

    console.log(`User connected: ${username}${users[username] ? ` (${users[username]})` : ""}`);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      delete users[username];
      io.emit('online', Object.keys(users));
    });

    socket.on("message", ({ sender, receiver, message, roomId }) => {
      console.log("message", { sender, receiver, message, roomId });
      const recipientSocketId = users[receiver.username];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("message", { sender, message }, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log(res);
          }
        });
      }
    });

    // socket.on('receiveMessage', ({ sender, message }) => {
    //   io.to(users[sender.username]).emit('receiveMessage', { sender, message });
    // })

    socket.on("typing", (data) => {
      io.to(users[data.username]).emit("typing", data);

      console.log(data);
    });

    socket.on("stopTyping", (data) => {
      io.to(users[data.username]).emit("stopTyping", data);
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
