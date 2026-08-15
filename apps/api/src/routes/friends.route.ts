import express from "express";

import {
  acceptRequestFriends,
  declineRequestFriends,
  deleteFriend,
  getFriends,
  getRequestFriends,
  postRequestFriends,
} from "../controllers/friends.controller.js";

const router = express.Router();

// api/friend
router.get("/", getFriends);
router.get("/request", getRequestFriends);
router.post("/request", postRequestFriends);
router.post("/:reqId/accept", acceptRequestFriends);
router.post("/:reqId/decline", declineRequestFriends);
router.delete("/:userId", deleteFriend);

export default router;
