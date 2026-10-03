import { useQuery } from "@tanstack/react-query";
import type { SobrietySummary } from "../types";
import { getSobriety, statsSobriety } from "../../../services/sobriety.service";

export const useSobriety = (userId: string) => {
  const { data: sobriety = null, isLoading: loading, error, refetch } = useQuery<SobrietySummary | null>({
    queryKey: ["sobriety", userId],
    queryFn: async () => {
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

      return summary;
    },
    enabled: !!userId,
  });

  return {
    sobriety,
    loading,
    error,
    refetch,
  };
};
