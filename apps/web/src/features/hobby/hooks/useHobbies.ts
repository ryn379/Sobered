import { useCallback, useEffect, useState } from "react";
import type { Hobby } from "../types";
import {
  createHobby,
  deleteHobby,
  getUserHobbies,
  getUserHobby,
  updateProgressHobby,
} from "../../../services/hobby.service.ts";

export const useHobby = (userId: string) => {
  const [entries, setEntries] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUserHobbies(userId);

      setEntries(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const getHobby = useCallback(
    async (hobbyId: string) => {
      try {
        const userHobby = await getUserHobby(userId, hobbyId);

        return userHobby;
      } catch (err) {
        console.log(err);
        setError("Failed to get Analysis");
        return null;
      }
    },
    [userId],
  );

  const addHobby = async ({
    hobbyTypeId,
    goal,
  }: {
    hobbyTypeId: string;
    goal: string;
  }) => {
    try {
      const hobby = await createHobby(userId, hobbyTypeId, goal);

      setEntries((prev) => [...prev, hobby]);
    } catch (err) {
      console.log(err);
      setError("Cannot add this hobby");
      return null;
    }
  };

  const removeHobby = async (hobbyId: string) => {
    try {
      setError(null);

      await deleteHobby(userId, hobbyId);

      setEntries((prev) => prev.filter((e) => e.id !== hobbyId));

      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to delete hobby");

      return false;
    }
  };

  const updateProgress = async (
    hobbyId: string,
    progress: number,
    note: string,
  ) => {
    try {
      setError(null);

      const updatedHobby = await updateProgressHobby(
        userId,
        hobbyId,
        progress,
        note,
      );

      setEntries((prev) =>
        prev.map((hobby) => (hobby.id === hobbyId ? updatedHobby : hobby)),
      );

      return updatedHobby;
    } catch (err) {
      console.error(err);

      setError("Failed to update progress");

      return null;
    }
  };

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries,
    getHobby,
    addHobby,
    removeHobby,
    updateProgress,
  };
};
