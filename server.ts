import { app } from "./src/app";
import { createServer } from "http";
import { Server } from "socket.io";
import { messageModel } from "./src/models/message";
import { channelModel } from "./src/models/channel";
import { usersModel } from "./src/models/users";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("last_state_channel", async (data) => {
    const lastStateChannel = await channelModel.findById(data.channelId);
    socket.emit("updatedChannel", lastStateChannel);
  });

  socket.on("message", async (data) => {
    const message = new messageModel(data);
    const savedMessage = await message.save();

    const currentConversation = await channelModel.findById(
      data.conversationId
    );

    const updatedChannel = await channelModel.findByIdAndUpdate(
      data.conversationId,
      {
        messages: [...(currentConversation?.messages as any[]), savedMessage],
      }
    );

    socket.emit("updatedChannel", updatedChannel);

    socket.emit("messages", savedMessage);

    socket.emit("new.message.listener", savedMessage);
  });

  socket.on("addFriend", async (data) => {
    const friend = await usersModel.findById(data.addId);

    if (typeof data.loggedUser.friends !== "undefined") {
      const friendList = [...data.loggedUser.friends, friend];
      data.loggedUser.friends = friendList;

      await usersModel.findByIdAndUpdate(data.loggedUser.uid, data.loggedUser);

      return socket.emit("updatedUser", data);
    }

    data.loggedUser["friends"] = [friend];
    await usersModel.findByIdAndUpdate(data.loggedUser.uid, data.loggedUser);
    socket.emit("updatedUser", data);
  });

  socket.on("update_user", async (data) => {
    await usersModel.findByIdAndUpdate(data.uid, data);
  });
});

httpServer.listen(8080, () => {
  console.log(`app listening on port http://localhost:${8080}`);
});
