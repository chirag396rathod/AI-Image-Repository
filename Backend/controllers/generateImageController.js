import * as dotenv from "dotenv";
import {
  PaginationResponse,
  handleCheckPostAndUser,
} from "../contants/contants.js";
import {
  CommentModel,
  PostLikeModel,
  PostModel,
} from "../mongodb/models/postModel.js";
import axios from "axios";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

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
  const user_id = req?.userToken?.id;

  let aggregationPipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $lookup: {
        from: "post_likes",
        localField: "_id",
        foreignField: "post_id",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "post_comments",
        localField: "_id",
        foreignField: "post_id",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "post_likes",
        let: { post_id: "$_id", user_id: new ObjectId(user_id) },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$post_id", "$$post_id"] },
                  { $eq: ["$user_id", "$$user_id"] },
                ],
              },
            },
          },
        ],
        as: "likedPosts",
      },
    },
    {
      $addFields: {
        total_likes: { $size: "$likes" },
        total_comment: { $size: "$comments" },
        isLiked: {
          $cond: [{ $gt: [{ $size: "$likedPosts" }, 0] }, true, false],
        },
      },
    },
    { $sort: { createdAt: sort || -1 } },
    {
      $project: {
        likes: 0,
        comments: 0,
        "createdBy.password": 0,
        "createdBy.__v": 0,
      },
    },
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
  const { post_id, action_val } = req.body;

  if (!post_id || action_val === (null || undefined)) {
    return res.status(400).json({
      success: "0",
      status: 400,
      error: "1",
      message: "Required param are missing!",
    });
  }
  const user_id = req?.userToken?.id;

  handleCheckPostAndUser(post_id, user_id);

  const userLikedObj = await PostLikeModel.findOne({
    user_id: user_id,
    post_id: post_id,
  });

  if (userLikedObj !== null || undefined) {
    try {
      const isDone = await PostLikeModel.deleteOne({
        _id: userLikedObj._id,
      });
      if (isDone) {
        return res.status(200).json({
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
        return res.status(200).json({
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

const handleCommentPost = async (req, res) => {
  const { comment, comment_id, post_id, user_id } = req.body;
  try {
    if (!comment || !post_id || !user_id) {
      return res.status(400).json({
        success: "0",
        status: 400,
        error: "1",
        message: "Required parameters are missing!",
      });
    }

    handleCheckPostAndUser(post_id, user_id);
    if (!comment_id) {
      const isDoneComment = await new CommentModel({
        post_id,
        user_id,
        comment_title: comment,
      });
      const data = isDoneComment.save();
      if (data) {
        return res.status(200).json({
          success: "1",
          status: 200,
          error: "0",
          message: "Success!",
          data: { ...isDoneComment?._doc },
        });
      }
    } else {
      const isDoneUpdateComment = new CommentModel.updateOne(
        {
          _id: comment_id,
        },
        {
          comment_title: comment,
        }
      );
      if (isDoneUpdateComment) {
        return res.status(200).json({
          success: "1",
          status: 200,
          error: "0",
          message: `Success!`,
          data: {
            ...isDoneUpdateComment,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (error) {
      return res.status(400).json({
        success: "0",
        status: 400,
        error: "1",
        message: "Error while comment post",
      });
    }
  }
};

const handleGetAllComment = async (req, res) => {
  const { post_id } = req.body;

  try {
    const aggregationPipeline = [
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $match: {
          post_id: new ObjectId(post_id),
        },
      },
      {
        $project: {
          "createdBy.password": 0,
          "createdBy.__v": 0,
        },
      },
    ];

    const data = await CommentModel.aggregate(aggregationPipeline);

    if (data.length > 0) {
      // Check if data is not an empty array
      return res.status(200).json({
        success: "1",
        status: 200,
        error: "0",
        message: "Success!",
        data: data,
      });
    } else {
      // Return a message if no comments found
      return res.status(200).json({
        success: "1",
        status: 200,
        error: "0",
        message: "No comments found for the specified post_id.",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "0",
      status: 500,
      error: "1",
      message: "Error while fetching comments.",
    });
  }
};

export {
  handleGetPost,
  handleUploadPost,
  handleGetAllPost,
  handleLikeAndDislike,
  handleCommentPost,
  handleGetAllComment,
};
