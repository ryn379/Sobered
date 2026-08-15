import express from "express";

import {
  changeSobreity,
  getSobreity,
  historySobreity,
  statsSobreity,
} from "./sobriety.controller.js";

const router = express.Router();

// api/sobriety
router.get("/", getSobreity);
router.post("/", changeSobreity);
router.get("/stats", statsSobreity);
router.get("/history", historySobreity);

export default router;
