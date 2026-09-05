import type { Group, GroupMember } from "../features/group/types";
import type { User } from "../features/home/types";
import api from "./api";

export const getGroups = async (userId: string): Promise<Group[]> => {
  const response = await api.get(`/group/${userId}/all`);

  return response.data.data;
};

export const getGroup = async (
  userId: string,
  groupId: string,
): Promise<Group> => {
  const response = await api.get(`/group/${userId}/${groupId}`);

  return response.data.data;
};

export const joinGroup = async (
  userId: string,
  groupId: string,
): Promise<GroupMember> => {
  const response = await api.patch(`/group/${userId}/${groupId}/join`);

  return response.data.data;
};

export const leaveGroup = async (
  userId: string,
  groupId: string,
): Promise<Group> => {
  const response = await api.patch(`/group/${userId}/${groupId}/leave`);

  return response.data.data;
};

export const membersGroup = async (
  userId: string,
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }[]> => {
  const response = await api.get(`/group/${userId}/${groupId}/members`);

  return response.data.data;
};

export const leaderGroup = async (
  userId: string,
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }> => {
  const response = await api.get(`/group/${userId}/${groupId}/leaders`);

  return response.data.data;
};

export const assignLeaderGroup = async (
  userId: string,
  memberId: string,
  groupId: string,
): Promise<GroupMember> => {
  const response = await api.post(`/group/${userId}/leader/assign`, {
    memberId,
    groupId,
  });

  return response.data.data;
};

export const removeLeaderGroup = async (
  userId: string,
  removedId: string,
  groupId: string,
): Promise<GroupMember> => {
  const response = await api.post(`/group/${userId}/leader/remove`, {
    removedId,
    groupId,
  });

  return response.data.data;
};

export const removeUserGroup = async (
  userId: string,
  removedId: string,
  groupId: string,
): Promise<User> => {
  const response = await api.post(`/group/${userId}/remove`, {
    removedId,
    groupId,
  });

  return response.data.data;
};
