import { Server } from "socket.io";
import http from "http";
import express from "express";
import session from "express-session";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.use(
  session({
    secret: "atul1234",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,// true in production if using HTTPS
      maxAge: 10 * 60 * 1000, // 10 minutes session timeout
    },
  })
);

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
