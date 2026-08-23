import api from "./api";
import type { DiaryEntry } from "../features/diary/types.ts";

export const getDiary = async (userId: string): Promise<DiaryEntry[]> => {
  const response = await api.get(`/diary/${userId}`);

  return response.data.data;
};

export const entryDiary = async (
  userId: string,
  content: string,
  title: string,
  mood?: string,
): Promise<DiaryEntry> => {
  const response = await api.post(`/diary/${userId}`, {
    title,
    content,
    mood,
  });

  return response.data.data;
};

export const getEntryDiary = async (
  userId: string,
  entryId: string,
): Promise<DiaryEntry> => {
  const response = await api.get(`/diary/${userId}/${entryId}`);

  return response.data.data;
};

export const updateEntryDiary = async (
  userId: string,
  entryId: string,
  content: string,
): Promise<DiaryEntry> => {
  const response = await api.patch(`/diary/${userId}/${entryId}`, {
    content,
  });

  return response.data.data;
};

export const deleteEntryDiary = async (
  userId: string,
  entryId: string,
): Promise<DiaryEntry> => {
  const response = await api.delete(`/diary/${userId}/${entryId}`);

  return response.data.data;
};
