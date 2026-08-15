import express from "express";
import {
  getDetailFamily,
  getFamily,
} from "../controllers/family.controller.js";

const router = express.Router();

// api/family
router.get("/", getFamily);
router.get("/:userId", getDetailFamily);

export default router;
