const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const handleSocket = require("./socket");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

handleSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
