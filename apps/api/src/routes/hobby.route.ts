import express from "express";
import {
  detailHobby,
  getAllHobbies,
  getDetailHobby,
  goalHobby,
  progressHobby,
  updateHobby,
} from "../controllers/hobby.controller.js";

const router = express.Router();

// api/hobby
router.get("/", getDetailHobby);
router.get("/all", getAllHobbies);
router.get("/:hobbyId", detailHobby);
router.get("/goal", goalHobby);
router.get("/progress", progressHobby);
router.post("/:hobbyId/update", updateHobby);

export default router;
