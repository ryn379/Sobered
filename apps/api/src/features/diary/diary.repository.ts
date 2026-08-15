import { diaryEntries, type DiaryEntry } from "./diary.mock.js";

export const findDiaryEntryByUserId = async (
  userId: string,
): Promise<DiaryEntry[]> => {
  console.log("this is in diary.repository");
  return diaryEntries.filter((e) => e.userId === userId);
};

export const findDiaryEntryByDiaryId = async (
  entryId: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.repository");

  const entry = diaryEntries.find((e) => e.id === entryId);

  return entry ?? null;
};

export const updateDiaryEntryByDiaryId = async (
  entryId: string,
  content: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.repository");

  const entry = diaryEntries.find((e) => e.id === entryId);

  if (!entry) return null;

  entry.content = content;
  entry.updatedAt = new Date().toISOString();

  return entry;
};

export const deleteDiaryEntryByDiaryId = async (
  entryId: string,
): Promise<DiaryEntry | null> => {
  console.log("this is in diary.repository");

  const entryIdx = diaryEntries.findIndex((e) => e.id === entryId);

  if (entryIdx === -1) return null;

  const [deletedEntry] = diaryEntries.splice(entryIdx, 1);

  return deletedEntry ?? null;
};

export const postDiaryEntry = async (
  userId: string,
  title: string,
  content: string,
  mood?: string,
): Promise<DiaryEntry> => {
  const id = `diary_${String(diaryEntries.length + 1).padStart(3, "0")}`;

  const now = new Date().toISOString();

  const entry: DiaryEntry = {
    id,
    userId,
    title,
    content,
    ...(mood !== undefined && { mood }),
    createdAt: now,
    updatedAt: now,
  };

  diaryEntries.push(entry);
  return entry;
};
