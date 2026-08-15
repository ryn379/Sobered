import type { Request, Response } from "express";
import {
  changeSobrietyService,
  getSobrietyService,
  historySobrietyService,
  statsSobrietyService,
} from "./sobriety.service.js";

export const getSobriety = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entry = await getSobrietyService(userId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "User ID Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const changeSobriety = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entry = await changeSobrietyService(userId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "User ID Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const statsSobriety = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entry = await statsSobrietyService(userId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const historySobriety = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entries = await historySobrietyService(userId);

    if (!entries) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: entries,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
