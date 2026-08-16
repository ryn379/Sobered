import type { Request, Response } from "express";
import {
  getAllEmergencyRequestService,
  postEmergencyRequestService,
} from "./emergency.service.js";

export const getAllEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entries = await getAllEmergencyRequestService(userId);

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

export const postEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { type } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const validTypes = [
      "CRAVING",
      "EMOTIONAL_SUPPORT",
      "PROFESSIONAL_HELP",
    ] as const;

    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Type",
      });
    }

    const request = await postEmergencyRequestService(userId, type);

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const acceptEmergencyRequest = async (req: Request, res: Response) => {};

export const closeEmergencyRequest = async (req: Request, res: Response) => {};

export const escalateEmergencyRequest = async (
  req: Request,
  res: Response,
) => {};
