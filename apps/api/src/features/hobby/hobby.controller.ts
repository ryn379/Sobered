import type { Request, Response } from "express";
import {
  createHobbyService,
  deleteHobbyService,
  getAnalysisHobbyService,
  getHobbyTypeService,
  getHobbyTypesService,
  getUserHobbiesService,
  getUserHobbyService,
  updateHobbyProgressService,
  updateHobbyService,
} from "./hobby.service.js";

export const getTypesHobby = async (_req: Request, res: Response) => {
  try {
    const types = await getHobbyTypesService();

    return res.status(200).json({
      success: true,
      types,
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
    const { hobbyTypeId } = req.params;

    if (!hobbyTypeId || typeof hobbyTypeId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby Type ID",
      });
    }

    const hobbyType = await getHobbyTypeService(hobbyTypeId);

    if (!hobbyType) {
      return res.status(404).json({
        success: false,
        message: "Use or Hobby Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: hobbyType,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserHobbies = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const userHobbies = await getUserHobbiesService(userId);

    if (!userHobbies) {
      return res.status(404).json({
        success: false,
        message: "User or Hobby Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: userHobbies,
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

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const hobby = await getUserHobbyService(userId, hobbyId);

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

export const createHobby = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { hobbyTypeId, goal } = req.body;

    if (!hobbyTypeId || typeof hobbyTypeId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby Type ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }
    if (!goal || typeof goal !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Goal",
      });
    }

    const hobby = await createHobbyService(userId, hobbyTypeId, goal);

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

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
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
        message: "User or Hobby Not Found",
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

export const updateProgressHobby = async (req: Request, res: Response) => {
  try {
    const { userId, hobbyId } = req.params;
    const { progress, note } = req.body;

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    if (typeof progress !== "number" || Number.isNaN(progress)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Progress",
      });
    }

    if (!note || typeof note !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const hobby = await updateHobbyProgressService(
      userId,
      hobbyId,
      progress,
      note,
    );

    if (!hobby) {
      return res.status(404).json({
        success: false,
        message: "User or Hobby Not Found",
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

export const deleteHobby = async (req: Request, res: Response) => {
  try {
    const { userId, hobbyId } = req.params;

    if (!hobbyId || typeof hobbyId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Hobby ID",
      });
    }

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const hobby = await deleteHobbyService(userId, hobbyId);

    if (!hobby) {
      return res.status(404).json({
        success: false,
        message: "User or Hobby Not Found",
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

export const getAnalysisHobby = async (req: Request, res: Response) => {
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
        message: "Invalid Hobby ID",
      });
    }

    const analysis = await getAnalysisHobbyService(userId, hobbyId);

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "User or Hobby Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (err: any) {
    console.log(err.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
