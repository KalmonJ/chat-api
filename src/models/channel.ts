import * as mongoose from "mongoose";

const channel = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },

    messages: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const channelModel = mongoose.model("channel", channel);
