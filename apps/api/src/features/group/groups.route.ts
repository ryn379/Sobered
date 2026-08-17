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

// api/groups
router.get("/", getGroups);
router.get(":groupId", getGroup);
router.post("/:userId/:groupId/join", joinGroup);
router.post("/:userId/:groupId/leave", leaveGroup);
router.get("/:userId/:groupId/members", membersGroup);
router.get("/:groupId/leaders", leaderGroup);
router.post("/:userId/leader/assign", assignLeaderGroup);
router.post("/:userId/leader/remove", removeLeaderGroup);
router.post("/:userId/remove", removeUserGroup);

export default router;
