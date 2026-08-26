import express from "express";

import {
  acceptRequestFriends,
  declineRequestFriends,
  deleteFriend,
  getFriends,
  getRequestFriends,
  getSuggestionFriends,
  postRequestFriends,
} from "./friend.controller.js";

const router = express.Router();

// api/friend
router.get("/:userId", getFriends);
router.get("/:userId/requests", getRequestFriends);
router.post("/:userId/request", postRequestFriends);
router.patch("/:userId/accept", acceptRequestFriends);
router.patch("/:userId/decline", declineRequestFriends);
router.delete("/:userId/:friendId", deleteFriend);

router.get("/:userId/suggestion", getSuggestionFriends);

export default router;
