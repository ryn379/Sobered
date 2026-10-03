import { useQuery } from "@tanstack/react-query";
import type { Analysis } from "../types";
import { getAnalysisHobby } from "../../../services/hobby.service";

export const useHobbyAnalysis = (userId?: string, hobbyId?: string) => {
  const { data: analysis = null, isLoading: loading, error, refetch: getAnalysis } = useQuery<Analysis | null>({
    queryKey: ["hobbyAnalysis", userId, hobbyId],
    queryFn: () => getAnalysisHobby(userId!, hobbyId!),
    enabled: !!userId && !!hobbyId,
  });

  return {
    analysis,
    loading,
    error,
    getAnalysis,
  };
};
