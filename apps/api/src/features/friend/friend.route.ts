import express from "express";

import {
  acceptRequestFriends,
  declineRequestFriends,
  deleteFriend,
  getFriends,
  getRequestFriends,
  postRequestFriends,
} from "./friend.controller.js";

const router = express.Router();

// api/friend
router.get("/:userId", getFriends);
router.get("/:userId/requests", getRequestFriends);
router.post("/:userId/request", postRequestFriends);
router.post("/:userId/accept", acceptRequestFriends);
router.post("/:userId/decline", declineRequestFriends);
router.delete("/:userId", deleteFriend);

export default router;
