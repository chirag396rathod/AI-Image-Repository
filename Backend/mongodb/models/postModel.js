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

const Post_likes = new mongoose.Schema({
  post_id: {
    type: String,
    required: [true, "Please enter post id"],
  },
  user_id: {
    type: String,
    required: [true, "Please enter user id"],
  },
  is_liked: {
    type: Number,
    default: 0,
  },
});

const PostModel = mongoose.model("posts", imagePostModel);
const PostLikeModel = mongoose.model("post_likes", Post_likes);
export { PostModel, PostLikeModel };
