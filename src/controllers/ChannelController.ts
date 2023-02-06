import { Request, Response } from "express";
import mongoose from "mongoose";
import { channelModel } from "../models/channel";
import { messageModel } from "../models/message";
import { usersModel } from "../models/users";

export class ChannelController {
  public static async createNewChannel(req: Request, res: Response) {
    const membersInChannel = await usersModel.find({
      _id: [req.body.receiverId, req.body.senderId],
    });

    const newChannel = new channelModel({
      members: membersInChannel,
    });

    try {
      const savedConversation = await newChannel.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public static async getChannelsFromUser(req: Request, res: Response) {
    try {
      const conversations = await channelModel.find();

      const filteredConversations = conversations.reduce((prev, curr) => {
        const currentUserInChannel = curr.members.findIndex(
          (member) => member["_id"].toString() === req.params.userId
        );

        if (currentUserInChannel !== -1) {
          prev.push(curr);
        }

        return prev;
      }, [] as mongoose.Document[]);

      res.status(200).json(filteredConversations);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public static async deleteChannel(req: Request, res: Response) {
    try {
      await channelModel.findByIdAndRemove(req.params.channelId);

      res.status(200).send({
        message: `channel with id:${req.params.channelId} was successfully deleted`,
      });
    } catch (error) {
      res.status(404).send({
        message: `channel with id: ${req.params.channelId} not found.`,
      });
    }
  }

  public static async updateChannel(req: Request, res: Response) {
    try {
      const channelId = req.params.channelId;
      const payload = req.body;
      const channel = await channelModel.findByIdAndUpdate(channelId, payload);
      const messages = await messageModel.find({ conversationId: channelId });
      messages.map(async (message) => await message.remove());

      res
        .status(200)
        .send({ message: "successfully updated channel", channel });
    } catch (error) {
      res.status(404).send({ message: "Channel not found", error });
    }
  }
}
