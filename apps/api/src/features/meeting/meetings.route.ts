import express from "express";
import {
  getAllMeeting,
  getDetailMeeting,
  joinMeeting,
  leaveMeeting,
} from "../controllers/meetings.controller.js";

const router = express.Router();

// api/meeting
router.get("/", getAllMeeting);
router.post("/:meetId/join", joinMeeting);
router.post("/:meetId/leave", leaveMeeting);
router.get("/:meetId", getDetailMeeting);

export default router;
