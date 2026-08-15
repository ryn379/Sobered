import express from "express";
import {
  deleteEntryDiary,
  entryDiary,
  getDiary,
  getEntryDiary,
  updateEntryDiary,
} from "../controllers/diary.controller.js";

const router = express.Router();

// api/diary
router.get("/", getDiary);
router.post("/entry", entryDiary);
router.get("/:entryId", getEntryDiary);
router.patch("/:entryId", updateEntryDiary);
router.delete("/:entryId", deleteEntryDiary);

export default router;
