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
router.post("/:reqId/accept", acceptEmergencyRequest);
router.post("/:reqId/close", closeEmergencyRequest);
router.post("/:reqId/escalate", escalateEmergencyRequest);

export default router;
