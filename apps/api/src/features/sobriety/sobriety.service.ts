import {
  type Sobriety,
  type SobrietyStats,
  type SobrietyHistory,
} from "./sobriety.mock.js";
import {
  addSobrietyHistory,
  changeSobrietyByUserId,
  getSobrietyByUserId,
  historySobrietyByUserId,
} from "./sobriety.repository.js";

export const getSobrietyService = async (
  userId: string,
): Promise<Sobriety | null> => {
  const entry = await getSobrietyByUserId(userId);
  return entry;
};

export const changeSobrietyService = async (
  userId: string,
): Promise<Sobriety | null> => {
  const entry = await getSobrietyByUserId(userId);

  if (!entry) return null;

  const oldStartDate = new Date(entry.startDate);
  const today = new Date();

  const diff = today.getTime() - oldStartDate.getTime();

  const currentStreak = Math.floor(diff / (1000 * 60 * 60 * 24));

  const longestStreak = Math.max(entry.longestStreak, currentStreak);

  await addSobrietyHistory(
    userId,
    entry.startDate,
    today.toISOString(),
    currentStreak,
  );

  const updatedSobriety = await changeSobrietyByUserId(
    userId,
    today.toISOString(),
    longestStreak,
    today.toISOString(),
  );

  return updatedSobriety;
};

export const statsSobrietyService = async (
  userId: string,
): Promise<SobrietyStats | null> => {
  const entrySobriety = await getSobrietyByUserId(userId);
  const entriesHistory = await historySobrietyByUserId(userId);

  if (!entrySobriety) return null;

  const start = new Date(entrySobriety.startDate);
  const today = new Date();

  const diff = today.getTime() - start.getTime();
  const currentStreak = Math.floor(diff / (1000 * 60 * 60 * 24));
  const historicalDays =
    entriesHistory?.reduce((total, period) => total + period.durationDays, 0) ??
    0;
  const totalDaysSober = historicalDays + currentStreak;
  const totalSobrietyPeriods =
    entriesHistory === null ? 0 : entriesHistory.length + 1;

  const entry: SobrietyStats = {
    currentStreak,
    longestStreak: entrySobriety.longestStreak,
    totalDaysSober,
    totalSobrietyPeriods,
    totalMeetings: entrySobriety.totalMeetings,
    startDate: entrySobriety.startDate,
  };
  return entry;
};

export const historySobrietyService = async (
  userId: string,
): Promise<SobrietyHistory[] | null> => {
  const entries = await historySobrietyByUserId(userId);

  return entries;
};
