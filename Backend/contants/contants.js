import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../mongodb/models/userModel.js";
import { PostModel } from "../mongodb/models/postModel.js";

dotenv.config();

export const PaginationResponse = (modal, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  if (endIndex < modal.length) {
    results.next = {
      page: page + 1,
      limit: limit,
      totle: modal.length,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
      totle: modal.length,
    };
  }
  (results.totle = modal.length),
    (results.data = modal.slice(startIndex, endIndex));
  return results;
};

export const checkAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Access token missing in headers." });
  }

  // The Authorization header is in the format: "Bearer <access_token>"
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: "Invalid access token." });
    }
    // Token is valid. You can now access the decoded token properties, if needed.
    req.userToken = decodedToken; // Adding the decoded token to the request object for future use.
    next();
  });
};

export const handleCheckPostAndUser = async ({ post_id, user_id }) => {
  if (post_id) {
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
  }
  if (user_id) {
    const isValidUserId = await User.findOne({ _id: user_id });
    if (!isValidUserId) {
      return res.status(400).json({
        success: "0",
        status: 400,
        error: "1",
        message: "Invalid User Id",
      });
    }
  }
};
