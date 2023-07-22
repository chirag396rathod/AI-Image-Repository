import express from "express";

import {
  handleGetAllPost,
  handleGetPost,
  handleUploadPost,
} from "../controllers/generateImageController.js";

const router = express.Router();

router.route("/generate-image").post(handleGetPost);
router.route("/share-image").post(handleUploadPost);
router.route("/get-share-image").post(handleGetAllPost);

export default router;
