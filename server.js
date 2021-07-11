const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get-document", (id) => {
    const data = "";
    socket.join(id);
    socket.emit("load-document", data);

    socket.on("send-change", (changes) => {
      socket.broadcast.to(id).emit("apply-change", changes);
    });
  });
});
