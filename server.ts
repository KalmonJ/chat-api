import { app } from "./src/app";
import { createServer } from "http";
import { Server } from "socket.io";
import { messageModel } from "./src/models/message";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", async (data) => {
    const message = new messageModel(data);
    await message.save();
    socket.emit("messages", data);
  });
});

httpServer.listen(8080, () => {
  console.log(`app listening on port http://localhost:${8080}`);
});
