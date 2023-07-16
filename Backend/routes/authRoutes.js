import express from "express";
import { SignupPost, SigninPost } from "../controllers/authController.js";

const router = express.Router();

// User Auth
router.route("/sign-in").post(SigninPost);
router.route("/sign-up").post(SignupPost);

export default router;
