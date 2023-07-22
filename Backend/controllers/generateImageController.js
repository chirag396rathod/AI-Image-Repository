import * as dotenv from "dotenv";
import { PaginationResponse } from "../contants/contants.js";
import { PostModel } from "../mongodb/models/postModel.js";
import axios from "axios";
import { User } from "../mongodb/models/userModel.js";
import mongoose from "mongoose";

dotenv.config();

const handleGetPost = async (req, res) => {
  try {
    const { prompt, pagination } = req.body;
    const page = parseInt(pagination.page);
    const limit = parseInt(pagination.limit);
    const response = await axios({
      url: `${process.env.LAXICA_AI_API}${prompt}`,
      method: "get",
    });
    const data = response.data;
    const result = PaginationResponse(data.images, page, limit);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).send(error?.response?.data?.error?.message);
  }
};

const handleUploadPost = async (req, res) => {
  const { prompt, src, user_id } = req.body;
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
  } = req.body;

  const data = await PostModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "createdBy",
      },
    },
  ]);

  const paginatedData = PaginationResponse(data, page, limit);
  res
    .status(200)
    .json({ success: "1", status: 200, error: "0", data: paginatedData });
};

export { handleGetPost, handleUploadPost, handleGetAllPost };
