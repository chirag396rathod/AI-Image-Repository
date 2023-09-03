import mongoose from "mongoose";

const conversationShema = new mongoose.Schema(
  {
    member: {
      type: Array,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: { createdAt: "created _at" } }
);

export const conversation = mongoose.model("conversation", conversationShema);
