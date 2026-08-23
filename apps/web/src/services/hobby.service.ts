import type {
  Analysis,
  Hobby,
  PredefinedHobby,
} from "../features/hobby/types.ts";
import api from "./api.ts";

export const getTypesHobby = async (): Promise<PredefinedHobby[]> => {
  const response = await api.get("/hobby/types");

  return response.data.types;
};

export const getTypeHobby = async (
  hobbyTypeId: string,
): Promise<PredefinedHobby> => {
  const response = await api.get(`/hobby/types/${hobbyTypeId}`);

  return response.data.data;
};

export const getUserHobbies = async (userId: string): Promise<Hobby[]> => {
  const response = await api.get(`/hobby/${userId}`);

  return response.data.data;
};

export const getUserHobby = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby> => {
  const response = await api.get(`/hobby/${userId}/${hobbyId}`);

  return response.data.data;
};

export const getAnalysisHobby = async (
  userId: string,
  hobbyId: string,
): Promise<Analysis> => {
  const response = await api.get(`/hobby/${userId}/${hobbyId}/analysis`);

  return response.data.data;
};

export const createHobby = async (
  userId: string,
  hobbyTypeId: string,
  goal: string,
): Promise<Hobby> => {
  const response = await api.post(`/hobby/${userId}`, {
    hobbyTypeId,
    goal,
  });

  return response.data.data;
};

export const updateHobby = async (
  userId: string,
  hobbyId: string,
  goal: string,
  description: string,
): Promise<Hobby> => {
  const response = await api.patch(`/hobby/${userId}/${hobbyId}`, {
    goal,
    description,
  });

  return response.data.data;
};

export const updateProgressHobby = async (
  userId: string,
  hobbyId: string,
  progress: number,
  note: string,
): Promise<Hobby> => {
  const response = await api.patch(`/hobby/${userId}/${hobbyId}/progress`, {
    progress,
    note,
  });

  return response.data.data;
};

export const deleteHobby = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby> => {
  const response = await api.delete(`/hobby/${userId}/${hobbyId}`);

  return response.data.data;
};
