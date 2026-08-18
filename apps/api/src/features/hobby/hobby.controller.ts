import type { Request, Response } from "express";
import {
  createHobbyService,
  getHobbiesService,
  getTypeHobbyService,
  getTypesHobbyService,
  getUserHobbyService,
  updateHobbyService,
} from "./hobby.service.js";

export const getTypesHobby = async (req: Request, res: Response) => {
  try {
    const types = await getTypesHobbyService();

    res.status(200).json({
      success: true,
      data: types,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTypeHobby = async (req: Request, res: Response) => {
  try {
    const { hobbyId } = req.params;

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    const hobby = await getTypeHobbyService(hobbyId);

    if (!hobby) {
      return res.status(404).json({
        success: false,
        message: "Hobby Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: hobby,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getHobbies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const hobbies = await getHobbiesService(userId);

    res.status(200).json({
      success: true,
      data: hobbies,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserHobby = async (req: Request, res: Response) => {
  try {
    const { userId, hobbyId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid HobbyID",
      });
    }

    const hobby = await getUserHobbyService(userId, hobbyId);

    if (!hobby) {
      return res.status(400).json({
        success: false,
        message: "User or Hobby Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: hobby,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createHobby = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { hobbyId, goal } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!goal || typeof goal !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Goal",
      });
    }

    const hobby = await createHobbyService(userId, hobbyId, goal);

    if (!hobby) {
      return res.status(404).json({
        success: false,
        message: "User or Hobby Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: hobby,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateHobby = async (req: Request, res: Response) => {
  try {
    const { userId, hobbyId } = req.params;
    const { goal, description } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!goal || typeof goal !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Goal",
      });
    }

    if (!description || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Description",
      });
    }

    const hobby = await updateHobbyService(userId, hobbyId, goal, description);

    if (!hobby) {
      return res.status(404).json({
        success: false,
        message: "Hobby Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: hobby,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteHobby = (req: Request, res: Response) => {};

export const updateProgressHobby = (req: Request, res: Response) => {};
