import * as mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },

    sender: {
      type: String,
    },

    text: {
      type: String,
    },

    image: {
      type: String,
    },

    messageDate: {
      type: Date,
    },

    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("message", MessageSchema);
