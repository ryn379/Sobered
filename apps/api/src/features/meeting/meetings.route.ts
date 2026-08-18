import express from "express";
import {
  getAllMeeting,
  getMembersMeeting,
  getMeeting,
  joinMeeting,
  leaveMeeting,
  startMeeting,
  endMeeting,
} from "./meetings.controller.js";

const router = express.Router();

// api/meeting
router.get("/:userId", getAllMeeting);
router.get("/:userId/:meetId/meet", getMeeting);
router.post("/:userId/:meetId/join", joinMeeting);
router.post("/:userId/:meetId/leave", leaveMeeting);
router.get("/:userId/:meetId/member", getMembersMeeting);
router.patch("/:userId/:meetId/start", startMeeting);
router.patch("/:userId/:meetId/end", endMeeting);

export default router;
