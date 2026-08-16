import express from "express";

import {
  changeSobriety,
  getSobriety,
  historySobriety,
  statsSobriety,
} from "./sobriety.controller.js";

const router = express.Router();

// api/sobriety
router.get("/:userId", getSobriety);
router.post("/:userId", changeSobriety);
router.get("/:userId/stats", statsSobriety);
router.get("/:userId/history", historySobriety);

export default router;
