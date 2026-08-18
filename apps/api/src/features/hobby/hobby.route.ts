import express from "express";
import {
  getTypesHobby,
  getTypeHobby,
  getHobbies,
  getUserHobby,
  createHobby,
  updateHobby,
  deleteHobby,
  updateProgressHobby,
} from "./hobby.controller.js";

const router = express.Router();

// api/hobby
router.get("/types", getTypesHobby);
router.get("/types/:hobbyId", getTypeHobby);
router.get("/:userId", getHobbies);
router.get("/:userId/:hobbyId", getUserHobby);
router.post("/:userId", createHobby);
router.patch("/:userId/:hobbyId", updateHobby);
router.delete("/:userId/:hobbyId", deleteHobby);
router.patch("/:userId/:hobbyId/progress", updateProgressHobby);

export default router;
