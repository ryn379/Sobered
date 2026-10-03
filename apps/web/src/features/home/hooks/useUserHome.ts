import { useQuery } from "@tanstack/react-query";

import { userHome } from "../../../services/user.service";

export const useUserHome = (userId: string) => {
  const { data, isLoading: loading, error, refetch } = useQuery({
    queryKey: ["userHome", userId],
    queryFn: () => userHome(userId),
    enabled: !!userId,
  });

  return {
    user: data?.user || null,
    sponsor: data?.sponsor || null,
    loading,
    error,
    refetch,
  };
};
