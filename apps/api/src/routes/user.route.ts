import express from "express";

import { Userhome } from "../controllers/user.controller.js";

const router = express.Router();

// api/user
router.get("/:userId", Userhome);

export default router;
