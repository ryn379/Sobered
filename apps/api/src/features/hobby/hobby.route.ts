import express from "express";
import {
  getTypesHobby,
  getTypeHobby,
  getUserHobbies,
  getUserHobby,
  createHobby,
  updateHobby,
  deleteHobby,
  updateProgressHobby,
  getAnalysisHobby,
} from "./hobby.controller.js";

const router = express.Router();

// api/hobby
router.get("/types", getTypesHobby);
router.get("/types/:hobbyTypeId", getTypeHobby);
router.get("/:userId", getUserHobbies);
router.get("/:userId/:hobbyId", getUserHobby);
router.get("/:userId/:hobbyId/analysis", getAnalysisHobby);
router.post("/:userId", createHobby);
router.patch("/:userId/:hobbyId", updateHobby);
router.patch("/:userId/:hobbyId/progress", updateProgressHobby);
router.delete("/:userId/:hobbyId", deleteHobby);

export default router;
