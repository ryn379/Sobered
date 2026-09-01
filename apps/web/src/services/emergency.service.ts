import type { EmergencyRequest } from "../features/home/types";
import api from "./api";

export const getAllEmergencyRequest = async (
  userId: string,
): Promise<EmergencyRequest[]> => {
  const response = await api.get(`/emergency/${userId}`);

  return response.data.data;
};

export const postEmergencyRequest = async (
  userId: string,
  type: string,
): Promise<EmergencyRequest> => {
  const response = await api.post(`/emergency/${userId}/post`, {
    type,
  });

  return response.data.data;
};

export const acceptEmergencyRequest = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest> => {
  const response = await api.patch(`/emergency/${userId}/${reqId}/accept`);

  return response.data.data;
};

export const closeEmergencyRequest = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest> => {
  const response = await api.patch(`/emergency/${userId}/${reqId}/close`);

  return response.data.data;
};

export const escalateEmergencyRequest = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest> => {
  const response = await api.patch(`/emergency/${userId}/${reqId}/escalate`);

  return response.data.data;
};
