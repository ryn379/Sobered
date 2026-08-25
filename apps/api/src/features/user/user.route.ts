import express from "express";

import { userhome } from "./user.controller.js";

const router = express.Router();

// api/user
router.get("/:userId", userhome);

export default router;
