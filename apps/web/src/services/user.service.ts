import type { User } from "../features/home/types.ts";
import api from "./api.ts";

export const userHome = async (
  userId: string,
): Promise<{ user: User; sponsor: User | null }> => {
  const response = await api.get(`/user/${userId}`);

  return response.data.data;
};
