import { useState } from "react";
import type { Analysis } from "../types";
import { getAnalysisHobby } from "../../../services/hobby.service";

export const useHobbyAnalysis = () => {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAnalysis = async (userId: string, hobbyId: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAnalysisHobby(userId, hobbyId);

      setAnalysis(data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch Analysis");
    } finally {
      setLoading(false);
    }
  };

  return {
    analysis,
    loading,
    error,
    getAnalysis,
  };
};
