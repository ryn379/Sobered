import type { Request, Response } from "express";

import {
  deleteDiarySerive,
  getDiaryEntriesService,
  getDiaryEntryService,
  postDiaryService,
  updateDiaryService,
} from "./diary.service.js";
import type { DiaryEntry } from "./diary.mock.js";

export const getDiary = async (req: Request, res: Response) => {
  try {
    console.log("this is in diary.controller");
    const { userId } = req.params;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "User Id is Invalid",
      });
    }
    const entries = await getDiaryEntriesService(userId);

    if (!entries) {
      return res.status(400).json({
        success: false,
        message: "No Diary Entry Found",
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

export const entryDiary = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { content, title, mood } = req.body;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Entry ID is Invalid",
      });
    }

    if (!content || typeof content !== "string") {
      return res.status(400).json({
        success: false,
        message: "Content is Invalid",
      });
    }

    if (!title || typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Content is Invalid",
      });
    }

    const entry = await postDiaryService(userId, title, content, mood);
    console.log(entry);

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

export const getEntryDiary = async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;

    if (!entryId || typeof entryId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Entry Id is Invalid",
      });
    }
    console.log(entryId);
    const entry = await getDiaryEntryService(entryId);

    if (!entry) {
      return res.status(400).json({
        success: false,
        message: "Diary Entry Not Found",
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

export const deleteEntryDiary = async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;

    if (!entryId || typeof entryId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Entry ID is Invalid",
      });
    }

    const deletedEntry = await deleteDiarySerive(entryId);

    if (!deletedEntry) {
      return res.status(400).json({
        success: false,
        message: "Entry Not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedEntry,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateEntryDiary = async (req: Request, res: Response) => {
  try {
    const { entryId } = req.params;
    const { content } = req.body;

    if (!entryId || typeof entryId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Entry ID is Invalid",
      });
    }

    if (!content || typeof content !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Diary Entry",
      });
    }

    const entry = await updateDiaryService(entryId, content);

    if (!entry) {
      return res.status(400).json({
        success: false,
        message: "Entry ID Not Found",
      });
    }

    return res.status(200).json({
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
