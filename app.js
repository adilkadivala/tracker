const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure the views directory is correctly set

// Use middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnect", socket.io);
  });
});

app.get("/", (req, res) => {
  res.render("index"); // Render index.ejs from the views directory
});

server.listen(5656, () => {
  console.log("Server is running on http://localhost:5656");
});
