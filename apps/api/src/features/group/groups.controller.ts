import type { Request, Response } from "express";
import {
  assignLeaderGroupService,
  getGroupService,
  getGroupsService,
  joinGroupService,
  leaderGroupService,
  leaveGroupService,
  membersGroupService,
  removeLeaderGroupService,
  removeUserGroupService,
} from "./groups.service.js";

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await getGroupsService();

    res.status(200).json({
      success: true,
      data: groups,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    if (!groupId || typeof groupId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Group ID",
      });
    }

    const group = await getGroupService(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: group,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
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

    const member = await joinGroupService(userId, groupId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
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

    const user = await leaveGroupService(userId, groupId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
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

export const membersGroup = async (req: Request, res: Response) => {
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

    const members = await membersGroupService(userId, groupId);

    if (!members) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
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

export const leaderGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;

    if (!groupId || typeof groupId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Group ID",
      });
    }

    const leaders = await leaderGroupService(groupId);

    if (!leaders) {
      return res.status(404).json({
        success: false,
        message: "Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: leaders,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const assignLeaderGroup = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { memberId, groupId } = req.body;

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
    if (!memberId || typeof memberId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const leader = await assignLeaderGroupService(userId, memberId, groupId);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: leader,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeLeaderGroup = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { removedId, groupId } = req.body;

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

    const member = await removeLeaderGroupService(userId, removedId, groupId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeUserGroup = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { removedId, groupId } = req.body;

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
    if (!removedId || typeof removedId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const member = await removeUserGroupService(userId, removedId, groupId);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "User or Group Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
