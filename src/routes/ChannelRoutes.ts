import express from "express";
import { ChannelController } from "../controllers/ChannelController";

export const channelRoutes = express.Router();
channelRoutes
  .post("/create/channel", ChannelController.createNewChannel)
  .get("/:userId", ChannelController.getChannelsFromUser)
  .delete("/channel/delete/:channelId", ChannelController.deleteChannel)
  .put("/channel/update/:channelId", ChannelController.updateChannel);
