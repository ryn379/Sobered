import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../home/types";
import {
  getFamily,
  getRecovererFromFamily,
  sobrietyFamily,
} from "../../../services/family.service";

export const useFamily = (userId: string, role: User["role"]) => {
  const [selectedRecovererId, setSelectedRecovererId] = useState<string | null>(
    null,
  );

  const familyQuery = useQuery({
    queryKey: ["family", userId],
    queryFn: () => getFamily(userId),
    enabled: !!userId && role === "RECOVERING_USER",
  });

  const recovererQuery = useQuery({
    queryKey: ["recoverer", userId],
    queryFn: () => getRecovererFromFamily(userId),
    enabled: !!userId && role === "FAMILY_MEMBER",
  });

  const sobrietyQuery = useQuery({
    queryKey: ["sobriety", userId, selectedRecovererId],
    queryFn: () => sobrietyFamily(userId, selectedRecovererId!),
    enabled: !!userId && !!selectedRecovererId,
  });

  const getRecoverer = (recovererId: string) => {
    setSelectedRecovererId(recovererId);
  };

  return {
    loading:
      familyQuery.isLoading ||
      recovererQuery.isLoading ||
      sobrietyQuery.isLoading,
    error: familyQuery.error || recovererQuery.error || sobrietyQuery.error,
    family: familyQuery.data ?? [],
    recoverer: recovererQuery.data ?? [],
    sobrietyStats: sobrietyQuery.data ?? null,
    getRecoverer,
    refetch: () => {
      if (role === "RECOVERING_USER") {
        return familyQuery.refetch();
      }

      return recovererQuery.refetch();
    },
  };
};
