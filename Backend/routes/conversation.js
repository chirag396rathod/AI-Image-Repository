import express from "express";
import {
  conversationControler,
  getConversationControler,
  getConversationUsers,
} from "../controllers/conversation.js";
import { getMassages, sendMassages } from "../controllers/massageController.js";
import { checkAccessToken } from "../contants/contants.js";

const router = express.Router();

// User Conversation
router.route("/conversation").post(checkAccessToken, conversationControler);
router.route("/conversation").get(checkAccessToken, getConversationControler);
router.route("/conversation/users").get(checkAccessToken, getConversationUsers);

// User massages
router.route("/massages").post(checkAccessToken, sendMassages);
router.route("/massages/get").post(checkAccessToken, getMassages);
export default router;
