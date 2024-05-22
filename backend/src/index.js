const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_socket_id", (component) => {
    console.log("---------------------------");
    console.log(`${component} : ${socket.id}`);
    console.log("---------------------------");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
