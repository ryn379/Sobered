import type { User } from "../features/home/types";
import type { SponsorRequest } from "../features/sponsor/types";
import api from "./api";

export const getSponsor = async (userId: string): Promise<User | null> => {
  const response = await api.get(`/sponsor/${userId}`);

  return response.data.data;
};

export const getReqsSponsor = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/sponsor/${userId}/requests`);

  return response.data.data;
};

export const acceptSponsor = async (
  userId: string,
  requesterId: string,
): Promise<SponsorRequest> => {
  const response = await api.patch(`/sponsor/${userId}/requests/accept`, {
    requesterId,
  });

  return response.data.data;
};

export const declineSponsor = async (
  userId: string,
  requesterId: string,
): Promise<SponsorRequest> => {
  const response = await api.patch(`/sponsor/${userId}/requests/decline`, {
    requesterId,
  });

  return response.data.data;
};

export const postReqSponsor = async (
  userId: string,
  recipientId: string,
): Promise<SponsorRequest> => {
  const response = await api.post(`/sponsor/${userId}/request`, {
    recipientId,
  });

  return response.data.data;
};

export const getMentee = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/sponsor/${userId}/mentee`);

  return response.data.data;
};

export const getSuggestions = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/sponsor/${userId}/suggestions`);

  return response.data.data;
};
