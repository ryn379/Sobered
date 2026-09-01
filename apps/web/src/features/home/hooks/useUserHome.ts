import { useCallback, useEffect, useState } from "react";

import type { User } from "../types";

import { userHome } from "../../../services/user.service";

export const useUserHome = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [sponsor, setSponsor] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserHome = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await userHome(userId);

      setUser(data.user);
      setSponsor(data.sponsor);
    } catch (err) {
      console.error(err);
      setError("Failed to load user information");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserHome();
  }, [fetchUserHome]);

  return {
    user,
    sponsor,
    loading,
    error,
    refetch: fetchUserHome,
  };
};
