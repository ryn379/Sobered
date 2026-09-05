import type { GroupMessage } from "../features/group/types";
import api from "./api";

export const getGroupMessages = async (
  userId: string,
  groupId: string,
): Promise<GroupMessage[]> => {
  const response = await api.get(`/group/chat/${userId}/${groupId}/messages`);

  return response.data.data;
};

export const sendGroupMessage = async (
  userId: string,
  groupId: string,
  content: string,
): Promise<GroupMessage> => {
  const response = await api.post(`/group/chat/${userId}/${groupId}/messages`, {
    content,
  });

  return response.data.data;
};
