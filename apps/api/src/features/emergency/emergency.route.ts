import express from "express";

import {
  acceptEmergencyRequest,
  closeEmergencyRequest,
  escalateEmergencyRequest,
  getAllEmergencyRequest,
  postEmergencyRequest,
} from "./emergency.controller.js";

const router = express.Router();

// api/emergency
router.get("/:userId", getAllEmergencyRequest);
router.post("/:userId/post", postEmergencyRequest);
router.patch("/:userId/:reqId/accept", acceptEmergencyRequest);
router.patch("/:userId/:reqId/close", closeEmergencyRequest);
router.patch("/:userId/:reqId/escalate", escalateEmergencyRequest);

export default router;
