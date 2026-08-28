import type { SobrietyStats, User } from "../features/home/types";
import api from "./api";

export const getFamily = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/family/${userId}`);

  return response.data.data;
};

export const sobrietyFamily = async (
  userId: string,
  recovererId: string,
): Promise<SobrietyStats> => {
  const response = await api.get(`/family/${userId}/${recovererId}/sobriety`);

  return response.data.data;
};

export const getRecovererFromFamily = async (
  userId: string,
): Promise<User[]> => {
  const response = await api.get(`/family/${userId}/recoverer`);

  return response.data.data;
};
