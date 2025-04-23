const express = require("express");
const dotenv = require("dotenv").config(); // load .env
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app); // create http server
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});


io.on("connection", (socket) => {
  console.log("new client connected: ", socket.id);

  socket.on("disconnected", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

app.set("socketio",io);

const port = process.env.PORT || 5000;

app.use(express.json());// get json type data from api
app.use("/api/orders", require("./routes/orderRouts")); // middleware
app.use(errorHandler);

app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`);
});

server.listen(5000, () => {
  console.log(`Server running on port 5000`);
});