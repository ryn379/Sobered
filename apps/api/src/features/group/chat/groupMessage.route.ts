import express from "express";
import {
  getGroupMessages,
  sendGroupMessage,
} from "./groupMessage.controller.js";

const router = express.Router();

// /api/group/chat
router.get("/:userId/:groupId/messages", getGroupMessages);
router.post("/:userId/:groupId/messages", sendGroupMessage);

export default router;
