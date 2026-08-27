import type { Request, Response } from "express";

import {
  acceptReqService,
  declineReqService,
  getMenteeService,
  getReqsService,
  getSponsorService,
  getSuggestionsSponsorService,
  postReqServiece,
} from "./sponsor.service.js";

export const getSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entry = await getSponsorService(userId);

    if (!entry) {
      return res.status(200).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (Array.isArray(entry)) {
      return res.status(200).json({
        success: true,
        data: null,
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

export const getReqsSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entries = await getReqsService(userId);

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

export const acceptSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { requesterId } = req.body;

    if (!requesterId || typeof requesterId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entry = await acceptReqService(userId, requesterId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Request Not Found",
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

export const declineSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { requesterId } = req.body;

    if (!requesterId || typeof requesterId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Request ID",
      });
    }

    const entry = await declineReqService(userId, requesterId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Request Not Found",
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

export const postReqSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { recipientId } = req.body;

    if (userId === recipientId) {
      return res.status(409).json({
        success: false,
        message: "Cannot Send Request to Yourself",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!recipientId || typeof recipientId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Recipient ID",
      });
    }

    const entry = await postReqServiece(userId, recipientId);

    if (!entry) {
      return res.status(400).json({
        success: false,
        message: "User and Recipient ID Combination is Invalid",
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

export const getMentee = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const mentees = await getMenteeService(userId);

    res.status(200).json({
      success: true,
      data: mentees,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getSuggestionsSponsor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const suggestions = await getSuggestionsSponsorService(userId);

    res.status(200).json({
      success: true,
      data: suggestions,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
