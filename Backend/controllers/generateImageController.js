import * as dotenv from "dotenv";
import { PaginationResponse } from "../contants/contants.js";
import { PostLikeModel, PostModel } from "../mongodb/models/postModel.js";
import axios from "axios";
import { User } from "../mongodb/models/userModel.js";

dotenv.config();

const handleGetPost = async (req, res) => {
  try {
    const { prompt, pagination, type } = req.body;
    const page = parseInt(pagination.page);
    const limit = parseInt(pagination.limit);
    const updatedPrompt = type !== "All" ? type + " " + prompt : prompt;
    const response = await axios({
      url: `${process.env.LAXICA_AI_API}${updatedPrompt}`,
      method: "get",
    });
    const data = response.data;
    const result = PaginationResponse(data.images, page, limit);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleUploadPost = async (req, res) => {
  const { prompt, src, user_id, type } = req.body;
  if (!prompt || !src || !user_id) {
    res.status(500).send("Post name or src is require!");
    return;
  }
  const Post = await PostModel.create({
    ...req.body,
  });
  Post.save();
  res.status(200).json({ success: "1", status: 200, error: "0" });
};

const handleGetAllPost = async (req, res) => {
  const {
    pagination: { page, limit },
    type,
    sort,
    search_str,
  } = req.body;

  let aggregationPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    { $sort: { createdAt: sort || -1 } },
  ];
  if (type && type !== "All") {
    aggregationPipeline.push({ $match: { type: type || "All" } });
  }
  if (search_str) {
    aggregationPipeline.push({ $match: { prompt: { $regex: search_str } } });
  }
  const data = await PostModel.aggregate(aggregationPipeline);
  const paginatedData = PaginationResponse(data, page, limit);
  res
    .status(200)
    .json({ success: "1", status: 200, error: "0", data: paginatedData });
};

const handleLikeAndDislike = async (req, res) => {
  const { post_id, user_id, action_val } = req.body;

  if (!post_id || !user_id || action_val === (null || undefined)) {
    return res.status(400).json({
      success: "0",
      status: 400,
      error: "1",
      message: "Required param are missing!",
    });
  }

  const isValidPostId = await PostModel.findOne({
    _id: post_id,
  });
  if (!isValidPostId) {
    return res.status(400).json({
      success: "0",
      status: 400,
      error: "1",
      message: "Invalid Post Id",
    });
  }
  const isValidUserId = await User.findOne({ _id: user_id });
  if (!isValidUserId) {
    return res.status(400).json({
      success: "0",
      status: 400,
      error: "1",
      message: "Invalid User Id",
    });
  }
  const userLikedObj = await PostLikeModel.findOne({
    user_id: user_id,
    post_id: post_id,
  });
  if (userLikedObj) {
    try {
      const isDone = await PostLikeModel.updateOne(
        {
          _id: userLikedObj._id,
        },
        {
          is_liked: parseInt(action_val),
        }
      );
      if (isDone) {
        return res.status(400).json({
          success: "1",
          status: 200,
          error: "0",
          message: `Success!`,
        });
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({
          success: "0",
          status: 400,
          error: "1",
          message: "Error while update record",
        });
      }
    }
  } else {
    try {
      const isCreateLiked = await new PostLikeModel({
        is_liked: parseInt(action_val),
        user_id,
        post_id,
      });
      const done = isCreateLiked.save();
      if (done) {
        return res.status(400).json({
          success: "1",
          status: 200,
          error: "0",
          message: `Success!`,
          data: {
            ...done,
          },
        });
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({
          success: "0",
          status: 400,
          error: "1",
          message: "Error while liked post",
        });
      }
    }
  }
};
export {
  handleGetPost,
  handleUploadPost,
  handleGetAllPost,
  handleLikeAndDislike,
};
