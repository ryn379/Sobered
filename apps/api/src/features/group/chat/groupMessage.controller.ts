import type { Request, Response } from "express";

import {
  getGroupMessagesService,
  sendGroupMessageService,
} from "./groupMessage.service.js";

export const getGroupMessages = async (req: Request, res: Response) => {
  try {
    const { userId, groupId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!groupId || typeof groupId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Group ID",
      });
    }

    const messages = await getGroupMessagesService(userId, groupId);

    if (!messages) {
      return res.status(403).json({
        success: false,
        message: "User cannot access this group chat",
      });
    }

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const sendGroupMessage = async (req: Request, res: Response) => {
  try {
    const { userId, groupId } = req.params;

    const { content } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!groupId || typeof groupId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Group ID",
      });
    }

    if (!content || typeof content !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid message content",
      });
    }

    const message = await sendGroupMessageService(userId, groupId, content);

    if (!message) {
      return res.status(403).json({
        success: false,
        message: "Unable to send message",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
