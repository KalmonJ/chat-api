import { Request, Response } from "express";
import { messageModel } from "../models/message";

export class MessageController {
  public static async createMessagesFromChannel(req: Request, res: Response) {
    const message = new messageModel(req.body);

    try {
      const savedMessage = await message.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public static async getMessagesfromChannel(req: Request, res: Response) {
    try {
      const messages = await messageModel.find({
        conversationId: req.params.conversationId,
      });

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
