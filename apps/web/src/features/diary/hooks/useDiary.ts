import { useCallback, useEffect, useState } from "react";
import type { DiaryEntry } from "../types";
import { deleteEntryDiary, getDiary } from "../../../services/diary.service";

export const useDiary = (userId: string) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDiary(userId);

      setEntries(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load diary entries.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const deleteEntry = async (entryId: string) => {
    try {
      await deleteEntryDiary(userId, entryId);

      setEntries((current) => current.filter((entry) => entry.id !== entryId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete diary entry.");
    }
  };

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries,
    deleteEntry,
  };
};
