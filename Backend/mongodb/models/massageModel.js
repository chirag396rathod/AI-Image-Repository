import mongoose from "mongoose";

const massageShema = new mongoose.Schema(
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
  },
  { timestamps: { createdAt: "created _at" } }
);

export const Massages = mongoose.model("massage", massageShema);
