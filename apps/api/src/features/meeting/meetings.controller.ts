import type { Request, Response } from "express";
import {
  endMeetingService,
  getAllMeetingService,
  getMeetingService,
  getMembersMeetingService,
  joinMeetingService,
  leaveMeetingService,
  startMeetingService,
} from "./meetings.service.js";

export const getAllMeeting = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const meetings = await getAllMeetingService(userId);

    if (!meetings) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const meet = await getMeetingService(userId, meetId);

    if (!meet) {
      return res.status(404).json({
        success: false,
        message: "Meeting Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: meet,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const joinMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }
    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Meet ID",
      });
    }

    const entry = await joinMeetingService(userId, meetId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "User or Meet Not Found",
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

export const leaveMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }
    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Meet ID",
      });
    }

    const user = await leaveMeetingService(userId, meetId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User or Meet Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMembersMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }
    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Meet ID",
      });
    }

    const members = await getMembersMeetingService(userId, meetId);

    if (!members) {
      return res.status(404).json({
        success: false,
        message: "User or Meet Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const startMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Meet ID",
      });
    }

    const meeting = await startMeetingService(userId, meetId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meet Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const endMeeting = async (req: Request, res: Response) => {
  try {
    const { userId, meetId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!meetId || typeof meetId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Meet ID",
      });
    }

    const meeting = await endMeetingService(userId, meetId);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meet Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
