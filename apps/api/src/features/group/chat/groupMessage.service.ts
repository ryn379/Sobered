import { findUserByUserId } from "../../user/user.repository.js";

import {
  getGroupMemberByUserId,
  getMessagesByGroupId,
  sendMessageToGroup,
} from "./groupMessage.repository.js";

import type { GroupMessage } from "./groupMessage.mock.js";
import { getGroupByGroupId } from "../group.repository.js";

export const getGroupMessagesService = async (
  userId: string,
  groupId: string,
): Promise<GroupMessage[] | null> => {
  const user = await findUserByUserId(userId);

  const group = await getGroupByGroupId(groupId);

  if (!user || !group) {
    console.log("User or Group Not Found");

    return null;
  }

  const member = await getGroupMemberByUserId(userId, groupId);

  if (!member) {
    console.log("User is not a member of this group");

    return null;
  }

  return await getMessagesByGroupId(groupId);
};

export const sendGroupMessageService = async (
  userId: string,
  groupId: string,
  content: string,
): Promise<GroupMessage | null> => {
  const user = await findUserByUserId(userId);

  const group = await getGroupByGroupId(groupId);

  if (!user || !group) {
    console.log("User or Group Not Found");

    return null;
  }

  const member = await getGroupMemberByUserId(userId, groupId);

  if (!member) {
    console.log("User is not a member of this group");

    return null;
  }

  if (!content || !content.trim()) {
    console.log("Message cannot be empty");

    return null;
  }

  return await sendMessageToGroup(groupId, userId, content.trim());
};
