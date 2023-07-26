import mongoose from "mongoose";

const imagePostModel = new mongoose.Schema(
  {
    src: {
      type: String,
      required: [true, "Please enter a image url"],
    },
    prompt: {
      type: String,
      required: [true, "Please enter a prompt"],
    },
    type: {
      type: String,
      required: [true, "Please enter a type"],
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please enter user id"],
    },
  },
  {
    timestamps: { createdAt: true },
  }
);

const PostModel = mongoose.model("posts", imagePostModel);
export { PostModel };
