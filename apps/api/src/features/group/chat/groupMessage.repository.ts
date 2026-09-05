import { groupMembers, type GroupMember } from "../group.mock.js";
import { groupMessages, type GroupMessage } from "./groupMessage.mock.js";

export const getMessagesByGroupId = async (
  groupId: string,
): Promise<GroupMessage[]> => {
  return groupMessages
    .filter((e) => e.groupId === groupId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
};

export const sendMessageToGroup = async (
  groupId: string,
  userId: string,
  content: string,
): Promise<GroupMessage> => {
  const message: GroupMessage = {
    id: `message_${String(groupMessages.length + 1).padStart(3, "0")}`,
    groupId,
    userId,
    content,
    createdAt: new Date().toISOString(),
  };

  groupMessages.push(message);

  return message;
};

export const getGroupMemberByUserId = async (
  userId: string,
  groupId: string,
): Promise<GroupMember | null> => {
  const member = groupMembers.find(
    (e) => e.userId === userId && e.groupId === groupId,
  );

  return member ?? null;
};
