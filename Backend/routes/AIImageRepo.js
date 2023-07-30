import express from "express";

import {
  handleCommentPost,
  handleGetAllComment,
  handleGetAllPost,
  handleGetPost,
  handleLikeAndDislike,
  handleUploadPost,
} from "../controllers/generateImageController.js";
import { checkAccessToken } from "../contants/contants.js";

const router = express.Router();

router.route("/generate-image").post(checkAccessToken, handleGetPost);
router.route("/share-image").post(checkAccessToken, handleUploadPost);
router.route("/get-share-image").post(checkAccessToken, handleGetAllPost);
router.route("/like-dislike").post(checkAccessToken, handleLikeAndDislike);
router.route("/post-comment").post(checkAccessToken, handleCommentPost);
router.route("/get-comment").post(checkAccessToken, handleGetAllComment);

export default router;
