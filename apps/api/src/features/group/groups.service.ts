import type { User } from "../user/user.mock.js";
import { findUserByUserId } from "../user/user.repository.js";
import {
  type Group,
  type GroupMember,
  groups,
  groupMembers,
} from "./group.mock.js";
import {
  addUserToGroupByGroupId,
  assignLeaderGroupByGroupId,
  getAllGroups,
  getGroupByGroupId,
  getGroupsByUserId,
  getLeadersByGroupId,
  getMembersByGroupId,
  removeLeaderGroupByGroupId,
  removeUserFromGroupByGroupId,
} from "./group.repository.js";

export const getGroupsService = async (): Promise<Group[]> => {
  const groups = await getAllGroups();

  return groups;
};

export const getGroupService = async (
  groupId: string,
): Promise<Group | null> => {
  const group = await getGroupByGroupId(groupId);

  return group;
};

export const joinGroupService = async (
  userId: string,
  groupId: string,
): Promise<GroupMember | null> => {
  const user = findUserByUserId(userId);
  const group = getGroupByGroupId(groupId);

  if (!user || !group) {
    console.log("User or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);

  const isInGroup = userGroups.some((e) => e.id === groupId);

  if (isInGroup) {
    console.log("User is already in this group");
    return null;
  }

  const member = await addUserToGroupByGroupId(userId, groupId);

  return member;
};

export const leaveGroupService = async (
  userId: string,
  groupId: string,
): Promise<User | null> => {
  const user = await findUserByUserId(userId);

  const group = await getGroupByGroupId(groupId);

  if (!user || !group) {
    console.log("User or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);

  const isInGroup = userGroups.some((e) => e.id === groupId);

  if (!isInGroup) {
    console.log("User is not in this group");
    return null;
  }

  await removeUserFromGroupByGroupId(userId, groupId);

  return user;
};

export const membersGroupService = async (
  userId: string,
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }[] | null> => {
  const group = await getGroupByGroupId(groupId);
  const user = await findUserByUserId(userId);

  if (!group || !user) {
    console.log("User or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);

  const isInGroup = userGroups.some((e) => e.id === groupId);

  if (!isInGroup) {
    console.log("User is Not in this Group");
    return null;
  }

  const members = await getMembersByGroupId(groupId);

  return members;
};

export const leaderGroupService = async (
  groupId: string,
): Promise<{ userMember: User; groupMember: GroupMember }[] | null> => {
  const group = await getGroupByGroupId(groupId);

  if (!group) {
    console.log("Group Not Found");
    return null;
  }

  const members = await getLeadersByGroupId(groupId);

  return members;
};

export const assignLeaderGroupService = async (
  userId: string,
  memberId: string,
  groupId: string,
): Promise<GroupMember | null> => {
  const user = await findUserByUserId(userId);
  const member = await findUserByUserId(memberId);
  const group = await getGroupByGroupId(groupId);

  if (!user || !group || !member) {
    console.log("User or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);
  const memberGroups = await getGroupsByUserId(memberId);

  const isInGroupUser = userGroups.some((e) => e.id === groupId);
  const isInGroupMember = memberGroups.some((e) => e.id === groupId);

  if (!isInGroupUser || !isInGroupMember) {
    console.log("User is Not in This Group");
    return null;
  }

  const userGroupMembers = await getMembersByGroupId(groupId);

  const isMemberMember = userGroupMembers.some(
    (e) => e.groupMember.userId === memberId && e.groupMember.role === "MEMBER",
  );

  const isUserLeader = userGroupMembers.some(
    (e) => e.groupMember.userId === userId && e.groupMember.role === "LEADER",
  );

  if (!isMemberMember || !isUserLeader) {
    console.log("User is Not a Leader Or Member Is A Leader");
    return null;
  }

  const userMember = await assignLeaderGroupByGroupId(memberId, groupId);

  return userMember;
};

export const removeLeaderGroupService = async (
  userId: string,
  removedId: string,
  groupId: string,
): Promise<GroupMember | null> => {
  const user = await findUserByUserId(userId);
  const removedUser = await findUserByUserId(removedId);
  const group = await getGroupByGroupId(groupId);

  if (!user || !group || !removedUser) {
    console.log("Any User Or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);
  const removedUserGroups = await getGroupsByUserId(removedId);

  const isInGroupUser = userGroups.some((e) => e.id === groupId);
  const isInGroupRemoved = removedUserGroups.some((e) => e.id === groupId);

  if (!isInGroupUser || !isInGroupRemoved) {
    console.log("Any User Is Not In This Group");
    return null;
  }

  const leaders = await getLeadersByGroupId(groupId);

  const isUserLeader = leaders.find(
    (e) => e.groupMember.userId === userId && e.groupMember.role === "LEADER",
  );

  if (!isUserLeader) {
    console.log("User Is Not A Leader And Cannot Remove");
    return null;
  }

  const isRemovedLeader = leaders.find(
    (e) =>
      e.groupMember.userId === removedId && e.groupMember.role === "LEADER",
  );

  if (!isRemovedLeader) {
    console.log("User To Remove Is Not A Leader");
    return null;
  }

  const member = await removeLeaderGroupByGroupId(removedId, groupId);

  return member;
};

export const removeUserGroupService = async (
  userId: string,
  removedId: string,
  groupId: string,
): Promise<User | null> => {
  const user = await findUserByUserId(userId);
  const removedUser = await findUserByUserId(removedId);
  const group = await getGroupByGroupId(groupId);

  if (!user || !group || !removedUser) {
    console.log("Any User Or Group Not Found");
    return null;
  }

  const userGroups = await getGroupsByUserId(userId);
  const removedUserGroups = await getGroupsByUserId(removedId);

  const isInGroupUser = userGroups.some((e) => e.id === groupId);
  const isInGroupRemoved = removedUserGroups.some((e) => e.id === groupId);

  if (!isInGroupUser || !isInGroupRemoved) {
    console.log("Any User Is Not In This Group");
    return null;
  }

  const leaders = await getLeadersByGroupId(groupId);

  const isUserLeader = leaders.find(
    (e) => e.groupMember.userId === userId && e.groupMember.role === "LEADER",
  );

  if (!isUserLeader) {
    console.log("User is Not a Leader And Cannot Remove");
    return null;
  }

  const isRemovedUserLeader = leaders.find(
    (e) =>
      e.groupMember.userId === removedId && e.groupMember.role === "LEADER",
  );

  if (isRemovedUserLeader) {
    console.log("User To Remove Is A Leader And Cannot Be Removed");
    return null;
  }

  await removeUserFromGroupByGroupId(removedId, groupId);

  return removedUser;
};
