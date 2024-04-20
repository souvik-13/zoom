"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_router_1 = __importDefault(require("./routes/user-router"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/user", user_router_1.default);
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
    console.dir(serverInfo, { depth: null });
});
