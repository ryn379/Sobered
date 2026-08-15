import express from "express";

import {
  acceptSponsor,
  declineSponsor,
  getReqsSponsor,
  getSponsor,
  postReqSponsor,
} from "./sponsor.controller.js";

const router = express.Router();

// api/sponsor

router.get("/:userId/requests", getReqsSponsor);
router.get("/:userId", getSponsor);
router.post("/:userId/request", postReqSponsor);
router.patch("/:userId/requests/:reqId/accept", acceptSponsor);
router.patch("/:userId/requests/:reqId/decline", declineSponsor);

export default router;
