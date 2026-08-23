import express from "express";
import {
  deleteEntryDiary,
  entryDiary,
  getDiary,
  getEntryDiary,
  updateEntryDiary,
} from "./diary.controller.js";

const router = express.Router();

// api/diary
router.get("/:userId", getDiary);
router.post("/:userId", entryDiary);
router.get("/:userId/:entryId", getEntryDiary);
router.patch("/:userId/:entryId", updateEntryDiary);
router.delete("/:userId/:entryId", deleteEntryDiary);

export default router;
