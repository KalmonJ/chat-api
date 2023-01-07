import express from "express";
import { MessageController } from "../controllers/MessageController";

export const messageRoutes = express.Router();

messageRoutes
  .post("/messages", MessageController.createMessagesFromChannel)
  .get("/messages/:conversationId", MessageController.getMessagesfromChannel);
