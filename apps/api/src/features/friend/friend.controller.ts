import type { Request, Response } from "express";
import {
  getFriendsService,
  getFriendRequestService,
  postFriendRequestService,
  deleteFriendService,
  acceptFriendService,
  declineFriendService,
} from "./friend.service.js";

export const getFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entries = await getFriendsService(userId);

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

export const getRequestFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const entries = await getFriendRequestService(userId);

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

export const postRequestFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { recipientId } = req.body;

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

    const entry = await postFriendRequestService(userId, recipientId);

    if (!entry) {
      return res.status(400).json({
        success: false,
        message: "Request Failed",
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

export const acceptRequestFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { requesterId } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!requesterId || typeof requesterId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Requester ID",
      });
    }

    const entry = await acceptFriendService(userId, requesterId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "User or Request Not Found",
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

export const declineRequestFriends = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { requesterId } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!requesterId || typeof requesterId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Requester ID",
      });
    }

    const entry = await declineFriendService(userId, requesterId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "User or Request Not Found",
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

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!friendId || typeof friendId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Recipient ID",
      });
    }

    const entry = await deleteFriendService(userId, friendId);
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Users Not Found",
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
