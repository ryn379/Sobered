import express from "express";
import {
  assignLeaderGroup,
  getAllGroups,
  getGroup,
  joinGroup,
  leaderGroup,
  membersGroup,
  removeLeaderGroup,
} from "../controllers/groups.controller.js";

const router = express.Router();

// api/groups
router.get("/", getAllGroups);
router.get(":groupId", getGroup);
router.post("/:groupId", joinGroup);
router.get(":groupId/members", membersGroup);
router.get(":groupId/leaders", leaderGroup);
router.post(":groupId/:userId/assign", assignLeaderGroup);
router.post(":groupId/:userId/remove", removeLeaderGroup);

export default router;
