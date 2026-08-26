import type { User } from "../features/home/types";
import type { Friend, FriendRequest } from "../features/friend/types";

import api from "./api";

export const getFriends = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/friend/${userId}`);

  return response.data.data;
};

export const getRequestFriends = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/friend/${userId}/requests`);

  return response.data.data;
};

export const postRequestFriends = async (
  userId: string,
  recipientId: string,
): Promise<FriendRequest> => {
  const response = await api.post(`/friend/${userId}/request`, {
    recipientId,
  });

  return response.data.data;
};

export const acceptRequestFriends = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest> => {
  const response = await api.patch(`/friend/${userId}/accept`, {
    requesterId,
  });

  return response.data.data;
};

export const declineRequestFriends = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest> => {
  const response = await api.patch(`/friend/${userId}/decline`, {
    requesterId,
  });

  return response.data.data;
};

export const deleteFriend = async (
  userId: string,
  friendId: string,
): Promise<Friend> => {
  const response = await api.delete(`/friend/${userId}/${friendId}`);

  return response.data.data;
};

export const getSuggestionFriends = async (userId: string): Promise<User[]> => {
  const response = await api.get(`/friend/${userId}/suggestion`);

  return response.data.data;
};
