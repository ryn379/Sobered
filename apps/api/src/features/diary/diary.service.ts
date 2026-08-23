import { findUserByUserId } from "../user/user.repository.js";
import type { DiaryEntry } from "./diary.mock.js";
import {
  deleteDiaryEntryByDiaryId,
  findDiaryEntryByDiaryId,
  findDiaryEntryByUserId,
  postDiaryEntry,
  updateDiaryEntryByDiaryId,
} from "./diary.repository.js";

export const getDiaryEntriesService = async (
  userId: string,
): Promise<DiaryEntry[]> => {
  console.log("this is in diary.service");

  const entries = await findDiaryEntryByUserId(userId);

  return entries;
};

export const getDiaryEntryService = async (
  userId: string,
  entryId: string,
): Promise<DiaryEntry | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  console.log("this is in diary.service");

  const entry = await findDiaryEntryByDiaryId(entryId);

  if (entry?.userId !== userId) {
    console.log("Entry does not belong to User");
    return null;
  }

  return entry;
};

export const updateDiaryService = async (
  userId: string,
  entryId: string,
  content: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.service");

  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not found");
    return null;
  }

  const diaryEntry = await findDiaryEntryByDiaryId(entryId);

  if (!diaryEntry) {
    console.log("Entry Not Found");
    return null;
  }

  if (diaryEntry.userId !== userId) {
    console.log("User not allowed to edit");
    return null;
  }

  const entry = await updateDiaryEntryByDiaryId(entryId, content);

  return entry;
};

export const deleteDiarySerive = async (
  userId: string,
  entryId: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.service");

  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const entry = await findDiaryEntryByDiaryId(entryId);

  if (!entry) {
    console.log("Entry Not Found");
    return null;
  }

  if (entry.userId !== userId) {
    console.log("User Not Allowed to Delete");
    return null;
  }

  const deletedEntry = await deleteDiaryEntryByDiaryId(entryId);

  return deletedEntry;
};

export const postDiaryService = async (
  userId: string,
  title: string,
  content: string,
  mood?: string,
): Promise<DiaryEntry> => {
  console.log("this is in diary.service");

  const entry = await postDiaryEntry(userId, title, content, mood);

  return entry;
};
