import express from "express";

import { handleGetPost } from "../controllers/generateImageController.js";

const router = express.Router();

router.route("/generate-image").post(handleGetPost);

export default router;
