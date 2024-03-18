import express from "express";
import {
  SignupPost,
  SigninPost,
  RegisteredPost,
} from "../controllers/authController.js";

const router = express.Router();

// User Auth
router.route("/sign-in").post(SigninPost);
router.route("/sign-up").post(SignupPost);
router.route("/register-email").post(RegisteredPost);

export default router;
