import type {
  Sobriety,
  SobrietyHistory,
  SobrietyStats,
} from "../features/home/types";
import api from "./api";

export const getSobriety = async (userId: string): Promise<Sobriety> => {
  const response = await api.get(`/sobriety/${userId}`);

  return response.data.data;
};

export const changeSobriety = async (userId: string): Promise<Sobriety> => {
  const response = await api.post(`/sobriety/${userId}`);

  return response.data.data;
};

export const statsSobriety = async (userId: string): Promise<SobrietyStats> => {
  const response = await api.get(`/sobriety/${userId}/stats`);

  return response.data.data;
};

export const historySobriety = async (
  userId: string,
): Promise<SobrietyHistory[]> => {
  const response = await api.get(`/sobriety/${userId}/history`);

  return response.data.data;
};
