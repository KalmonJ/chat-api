import { Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import { channelModel } from "../models/channel";
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
      console.log(error, "erroro???");
      res.status(500).json(error);
    }
  }
}
