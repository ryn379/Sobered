import express from "express";
import {
  assignLeaderGroup,
  getGroups,
  getGroup,
  joinGroup,
  leaderGroup,
  membersGroup,
  removeLeaderGroup,
  leaveGroup,
  removeUserGroup,
} from "./groups.controller.js";

const router = express.Router();

// api/group
router.get("/:userId/all", getGroups);
router.get("/:userId/:groupId", getGroup);
router.patch("/:userId/:groupId/join", joinGroup);
router.patch("/:userId/:groupId/leave", leaveGroup);
router.get("/:userId/:groupId/members", membersGroup);
router.get("/:userId/:groupId/leaders", leaderGroup);
router.post("/:userId/leader/assign", assignLeaderGroup);
router.post("/:userId/leader/remove", removeLeaderGroup);
router.post("/:userId/remove", removeUserGroup);

export default router;
