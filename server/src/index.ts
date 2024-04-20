import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import UserRouter from "./routes/user-router";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./types";

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRouter);

io.on("connection", (socket) => {
  socket.emit("noArg");
  socket.emit("basicEmit", 1, "2", Buffer.from([3]));
  socket.emit("withAck", "4", (e) => {
    // e is inferred as number
  });

  // works when broadcast to all
  io.emit("noArg");

  // works when broadcasting to a room
  io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
});

const serverInfo = {
  name: "Server",
  version: "1.0.0",
  port: PORT,
  url: `http://localhost:${PORT}`,
  paths: [
    {
      router: "/user",
      endpoints: [
        {
          path: "/login",
          method: "POST",
          description: "Login user",
        },
        {
          path: "/register",
          method: "POST",
          description: "Register user",
        },
        {
          path: "/update",
          method: "PUT",
          description: "Update user",
        },
        {
          path: "/delete",
          method: "DELETE",
          description: "Delete user",
        },
      ],
    },
  ],
};
server.listen(PORT, () => {
  console.dir(serverInfo, { depth: null});
});
