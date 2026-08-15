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
  entryId: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.service");

  const entry = await findDiaryEntryByDiaryId(entryId);

  return entry;
};

export const updateDiaryService = async (
  entryId: string,
  content: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.service");

  const entry = await updateDiaryEntryByDiaryId(entryId, content);
  return entry;
};

export const deleteDiarySerive = async (
  entryId: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.service");

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
