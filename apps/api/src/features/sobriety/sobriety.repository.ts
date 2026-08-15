import type { Sobriety, SobrietyHistory } from "./sobriety.mock.js";
import { sobrietyHistory, sobrietyRecords } from "./sobriety.mock.js";

export const getSobrietyByUserId = async (
  userId: string,
): Promise<Sobriety | null> => {
  const entry = sobrietyRecords.find((e) => e.userId === userId);

  return entry ?? null;
};

export const changeSobrietyByUserId = async (
  userId: string,
  startDate: string,
  longestStreak: number,
  updatedAt: string,
): Promise<Sobriety | null> => {
  const entry = sobrietyRecords.find((e) => e.userId === userId);

  if (!entry) return null;

  entry.startDate = startDate;
  entry.longestStreak = longestStreak;
  entry.updatedAt = updatedAt;

  return entry;
};

export const addSobrietyHistory = async (
  userId: string,
  startDate: string,
  endDate: string,
  durationDays: number,
): Promise<SobrietyHistory> => {
  const historyEntry: SobrietyHistory = {
    id: `history_${String(sobrietyHistory.length + 1).padStart(3, "0")}`,
    userId,
    startDate,
    endDate,
    durationDays,
    createdAt: new Date().toISOString(),
  };

  sobrietyHistory.push(historyEntry);

  return historyEntry;
};

export const historySobrietyByUserId = async (
  userId: string,
): Promise<SobrietyHistory[] | null> => {
  const entries = sobrietyHistory.filter(
    (history) => history.userId === userId,
  );

  if (entries.length === 0) return null;

  return entries;
};
