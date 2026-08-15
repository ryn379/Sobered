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
router.get("/entry/:entryId", getEntryDiary);
router.patch("/entry/:entryId", updateEntryDiary);
router.delete("/entry/:entryId", deleteEntryDiary);

export default router;
