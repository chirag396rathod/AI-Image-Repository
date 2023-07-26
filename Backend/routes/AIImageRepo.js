import express from "express";

import {
  handleGetAllPost,
  handleGetPost,
  handleUploadPost,
} from "../controllers/generateImageController.js";
import { checkAccessToken } from "../contants/contants.js";

const router = express.Router();

router.route("/generate-image").post(checkAccessToken, handleGetPost);
router.route("/share-image").post(checkAccessToken, handleUploadPost);
router.route("/get-share-image").post(checkAccessToken, handleGetAllPost);

export default router;
