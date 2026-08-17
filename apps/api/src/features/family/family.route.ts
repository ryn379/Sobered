import express from "express";
import {
  getFamily,
  getRecovererFromFamily,
  sobrietyFamily,
} from "./family.controller.js";

const router = express.Router();

// api/family
router.get("/:userId", getFamily);
router.get("/:userId/:recovererId/sobriety", sobrietyFamily);
router.get("/:userId/recoverer", getRecovererFromFamily);

export default router;
