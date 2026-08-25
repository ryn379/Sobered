import { useCallback, useEffect, useState } from "react";

import type { SobrietySummary } from "../types";

import { getSobriety, statsSobriety } from "../../../services/sobriety.service";

export const useSobriety = (userId: string) => {
  const [sobriety, setSobriety] = useState<SobrietySummary | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchSobriety = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [data, stats] = await Promise.all([
        getSobriety(userId),
        statsSobriety(userId),
      ]);

      const summary: SobrietySummary = {
        id: data.id,
        startDate: data.startDate,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        totalDays: stats.totalDaysSober,
      };

      setSobriety(summary);
    } catch (err) {
      console.error(err);
      setError("Failed to load sobriety information");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSobriety();
  }, [fetchSobriety]);

  return {
    sobriety,
    loading,
    error,
    refetch: fetchSobriety,
  };
};
