import { useCallback, useEffect, useState } from "react";
import type { SobrietyStats, User } from "../../home/types";
import {
  getFamily,
  getRecovererFromFamily,
  sobrietyFamily,
} from "../../../services/family.service";

export const useFamily = (userId: string, role: User["role"]) => {
  const [family, setFamily] = useState<User[]>([]);
  const [recoverer, setRecoverer] = useState<User[]>([]);
  const [sobrietyStats, setSobrietyStats] = useState<SobrietyStats | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (role === "RECOVERING_USER") {
        const familyData = await getFamily(userId);

        setFamily(familyData);
        setRecoverer([]);
      }

      if (role === "FAMILY_MEMBER") {
        const recovererData = await getRecovererFromFamily(userId);

        setRecoverer(recovererData);
        setFamily([]);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch Family");
    } finally {
      setLoading(false);
    }
  }, [userId, role]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const getRecoverer = async (recovererId: string) => {
    try {
      const sobrietyData = await sobrietyFamily(userId, recovererId);

      setSobrietyStats(sobrietyData);
      return sobrietyData;
    } catch (err) {
      console.log(err);
      setError("Failed to get Recoverer details");
      return null;
    }
  };

  return {
    loading,
    error,

    family,
    recoverer,
    sobrietyStats,

    getRecoverer,
    refetch: fetchEntries,
  };
};
