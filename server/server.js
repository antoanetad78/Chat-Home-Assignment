const express = require("express");
const socket = require("socket.io");
const http = require('http')

const app  = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app);

// Socket setup
const io = socket(server);

io.on("connection", function () {
  console.log("Made socket connection");
});

server.listen(PORT, ()=>{
  console.log("listenning on port",PORT );
})