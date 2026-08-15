import express from "express";

import {
  acceptRequest,
  closeRequest,
  escalateRequest,
  getAllRequest,
  postRequest,
} from "../controllers/emergency.controller.js";

const router = express.Router();

// api/emergency
router.get("/", getAllRequest);
router.post("/", postRequest);
router.post("/:reqId/accept", acceptRequest);
router.post("/:reqId/close", closeRequest);
router.post("/:reqId/escalate", escalateRequest);

export default router;
