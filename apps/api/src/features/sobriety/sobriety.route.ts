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
router.get("/stats/:userId", statsSobriety);
router.get("/history/:userId", historySobriety);

export default router;
