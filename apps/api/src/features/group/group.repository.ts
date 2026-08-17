import { users, type User } from "../user/user.mock.js";
import {
  type Group,
  type GroupMember,
  groups,
  groupMembers,
} from "./group.mock.js";

export const getAllGroups = async (): Promise<Group[]> => {
  return groups;
};

export const getGroupsByUserId = async (userId: string): Promise<Group[]> => {
  const userGroups = groupMembers
    .filter((e) => e.userId === userId)
    .map((f) => {
      return groups.find((g) => g.id === f.groupId);
    })
    .filter((group): group is Group => group !== undefined);

  return userGroups;
};

export const getGroupByGroupId = async (
  groupId: string,
): Promise<Group | null> => {
  const group = groups.find((e) => e.id === groupId);

  return group ?? null;
};

export const addUserToGroupByGroupId = async (
  userId: string,
  groupId: string,
): Promise<GroupMember> => {
  const member: GroupMember = {
    groupId,
    userId,
    role: "MEMBER",
    joinedAt: new Date().toISOString(),
  };

  groupMembers.push(member);
  return member;
};

export const removeUserFromGroupByGroupId = async (
  userId: string,
  groupId: string,
): Promise<void> => {
  const idx = groupMembers.findIndex(
    (e) => e.groupId === groupId && e.userId === userId,
  );

  if (idx === -1) return;

  groupMembers.splice(idx, 1);
};

export const getMembersByGroupId = async (
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }[]> => {
  const members = groupMembers.filter((e) => e.groupId === groupId);

  const userMembers = members
    .map((e) => {
      return users.find((f) => f.id === e.userId);
    })
    .filter((user): user is User => user !== undefined);

  const userGroupMembers = userMembers.map((e) => {
    const groupMember = members.find((f) => f.userId === e.id);
    return {
      userMember: e,
      groupMember: groupMember!,
    };
  });

  return userGroupMembers;
};

export const getLeadersByGroupId = async (
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }[]> => {
  const members = groupMembers.filter(
    (e) => e.groupId === groupId && e.role === "LEADER",
  );

  const userMembers = members
    .map((e) => {
      return users.find((f) => f.id === e.userId);
    })
    .filter((user): user is User => user !== undefined);

  const userGroupMembers = userMembers.map((e) => {
    const groupMember = members.find((f) => f.userId === e.id);
    return {
      userMember: e,
      groupMember: groupMember!,
    };
  });

  return userGroupMembers;
};

export const assignLeaderGroupByGroupId = async (
  userId: string,
  groupId: string,
): Promise<GroupMember> => {
  const member = groupMembers.find(
    (e) => e.groupId === groupId && e.userId === userId,
  );

  member!.role = "LEADER";

  return member!;
};

export const removeLeaderGroupByGroupId = async (
  removedId: string,
  groupId: string,
): Promise<GroupMember> => {
  const leader = groupMembers.find(
    (e) => e.userId === removedId && e.groupId === groupId,
  );

  leader!.role = "MEMBER";

  return leader!;
};
