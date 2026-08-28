import type { Request, Response } from "express";
import {
  getFamilyService,
  getRecovererFromFamilyService,
  SobrietyFamilyService,
} from "./family.service.js";

export const getFamily = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const family = await getFamilyService(userId);

    if (!family) {
      return res.status(400).json({
        success: false,
        message: "User or Family Could Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: family,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getRecovererFromFamily = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const recoverer = await getRecovererFromFamilyService(userId);

    if (!recoverer) {
      return res.status(400).json({
        success: false,
        message: "User or Family Could Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: recoverer,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const sobrietyFamily = async (req: Request, res: Response) => {
  try {
    const { userId, recovererId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!recovererId || typeof recovererId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const sobriety = await SobrietyFamilyService(userId, recovererId);

    if (!sobriety) {
      return res.status(404).json({
        success: false,
        message: "User Not Found or Family Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: sobriety,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
