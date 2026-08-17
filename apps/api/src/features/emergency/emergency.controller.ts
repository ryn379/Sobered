import type { Request, Response } from "express";
import {
  acceptEmergencyRequestService,
  closeEmergencyRequestService,
  escalateEmergencyRequestService,
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

    if (!request) {
      return res.status(409).json({
        success: false,
        message: "An Emergency Request Already Exists",
      });
    }

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

export const acceptEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const { userId, reqId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!reqId || typeof reqId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Emergency Request ID",
      });
    }

    const request = await acceptEmergencyRequestService(userId, reqId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Emergency Request Not Found or Cannot Be Accepted",
      });
    }

    return res.status(200).json({
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

export const closeEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const { userId, reqId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!reqId || typeof reqId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const entries = await closeEmergencyRequestService(userId, reqId);

    if (!entries) {
      return res.status(404).json({
        success: false,
        message: "User or Request Not Found",
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

export const escalateEmergencyRequest = async (req: Request, res: Response) => {
  try {
    const { userId, reqId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!reqId || typeof reqId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const request = await escalateEmergencyRequestService(userId, reqId);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request or User Not Found",
      });
    }

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
