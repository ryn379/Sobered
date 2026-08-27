import express from "express";

import {
  acceptSponsor,
  declineSponsor,
  getMentee,
  getReqsSponsor,
  getSponsor,
  getSuggestionsSponsor,
  postReqSponsor,
} from "./sponsor.controller.js";

const router = express.Router();

// api/sponsor

router.get("/:userId/requests", getReqsSponsor);
router.get("/:userId", getSponsor);
router.get("/:userId/mentee", getMentee);
router.post("/:userId/request", postReqSponsor);
router.patch("/:userId/requests/accept", acceptSponsor);
router.patch("/:userId/requests/decline", declineSponsor);
router.get("/:userId/suggestions", getSuggestionsSponsor);

export default router;
