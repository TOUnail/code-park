const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const Document = require("./Document");
const dotenv = require("dotenv");
dotenv.config();
// mongoose.connect(process.env.CONNECTION_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

mongoose.connect("mongodb://localhost/code-park", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
  wsEngine: require("ws").Server,
});
app.use(cors());
const PORT = process.env.PORT || 3001;
app.get("/", (req, res) => {
  res.send("Server is running");
});
const defaultValue = "";
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get-document", async (id) => {
    const document = await findOrCreateDocument(id);
    socket.join(id);
    socket.emit("load-document", document.data);
    // socket.on("send-cursor", (cursorCoord) => {
    //   socket.broadcast.to(id).emit("get-cursor", cursorCoord);
    // });
    socket.on("send-html", (changes) => {
      socket.broadcast.to(id).emit("apply-html", changes);
    });
    socket.on("send-css", (changes) => {
      socket.broadcast.to(id).emit("apply-css", changes);
    });
    socket.on("send-js", (changes) => {
      socket.broadcast.to(id).emit("apply-js", changes);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(id, { data });
    });
  });
});
async function findOrCreateDocument(id) {
  if (id == null) return;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
