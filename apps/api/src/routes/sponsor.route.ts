import express from "express";
import {
  acceptSponsor,
  declineSponsor,
  getReqsSponsor,
  getSponsor,
  postReqSponsor,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

// api/sponsor
router.get("/", getSponsor);
router.get("/requests", getReqsSponsor);
router.post("/:userId/accept", acceptSponsor);
router.post("/:userId/decline", declineSponsor);
router.post("/:userId/request", postReqSponsor);

export default router;
