import { describe, it, expect, vi, beforeEach } from "vitest";
import { findUserByUserId } from "../../src/features/user/user.repository.ts";
import { User } from "../../src/features/user/user.mock.ts";
import { getGroupByGroupId } from "../../src/features/group/group.repository.ts";
import { Group, GroupMember } from "../../src/features/group/group.mock.ts";
import {
  getGroupMemberByUserId,
  getMessagesByGroupId,
  sendMessageToGroup,
} from "../../src/features/group/chat/groupMessage.repository.ts";
import { GroupMessage } from "../../src/features/group/chat/groupMessage.mock.ts";
import {
  getGroupMessagesService,
  sendGroupMessageService,
} from "../../src/features/group/chat/groupMessage.service.ts";

vi.mock("../../src/features/group/chat/groupMessage.repository.ts");
vi.mock("../../src/features/user/user.repository.ts");
vi.mock("../../src/features/group/group.repository.ts");

beforeEach(() => {
  vi.resetAllMocks();
});

const user: User = {
  id: "user_001",
  username: "alex_recovery",
  email: "alex@example.com",
  role: "RECOVERING_USER",
  createdAt: "2026-07-01T10:00:00.000Z",
};

const group: Group = {
  id: "group_001",
  name: "Starting Again",
  description: "A welcoming group for people in the early stages of recovery.",
  createdBy: "user_001",
  createdAt: "2026-07-05T10:00:00.000Z",
};

const groupMember: GroupMember = {
  groupId: "group_001",
  userId: "user_001",
  role: "LEADER",
  joinedAt: "2026-07-05T10:00:00.000Z",
};

const groupMessages: GroupMessage[] = [
  {
    id: "message_001",
    groupId: "group_001",
    userId: "user_001",
    content: "Welcome everyone. Glad you're here.",
    createdAt: "2026-09-03T10:00:00.000Z",
  },
  {
    id: "message_002",
    groupId: "group_001",
    userId: "user_002",
    content: "Thanks. Happy to be here.",
    createdAt: "2026-09-03T10:05:00.000Z",
  },
];

const newMessage = {
  id: "message_003",
  groupId: "group_001",
  userId: "user_001",
  content: "this some cool shit man, yo",
  createdAt: "2026-09-03T10:05:00.000Z",
};

describe("getGroupMessagesService", () => {
  it("returns GroupMessage[] of the user", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(group);
    vi.mocked(getGroupMemberByUserId).mockResolvedValueOnce(groupMember);
    vi.mocked(getMessagesByGroupId).mockResolvedValueOnce(groupMessages);

    const result = await getGroupMessagesService("user_001", "group_001");

    expect(result).toEqual(groupMessages);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).toHaveBeenCalledWith(
      "user_001",
      "group_001",
    );
    expect(getMessagesByGroupId).toHaveBeenCalledWith("group_001");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getGroupMessagesService("user", "group_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).not.toHaveBeenCalledWith(
      "user_001",
      "group_001",
    );
    expect(getMessagesByGroupId).not.toHaveBeenCalledWith("group_001");
  });

  it("returns null if group does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(null);

    const result = await getGroupMessagesService("user_001", "group");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group");
    expect(getGroupMemberByUserId).not.toHaveBeenCalledWith(
      "user_001",
      "group",
    );
    expect(getMessagesByGroupId).not.toHaveBeenCalledWith("group");
  });

  it("returns null if member is not of the group", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(group);
    vi.mocked(getGroupMemberByUserId).mockResolvedValueOnce(null);

    const result = await getGroupMessagesService("user_003", "group_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).toHaveBeenCalledWith(
      "user_003",
      "group_001",
    );
    expect(getMessagesByGroupId).not.toHaveBeenCalledWith("group_001");
  });
});

describe("sendGroupMessageService", () => {
  it("returns GroupMessage that is posted", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(group);
    vi.mocked(getGroupMemberByUserId).mockResolvedValueOnce(groupMember);
    vi.mocked(sendMessageToGroup).mockResolvedValueOnce(newMessage);

    const result = await sendGroupMessageService(
      "user_001",
      "group_001",
      "this some cool shit man, yo",
    );

    expect(result).toEqual(newMessage);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).toHaveBeenCalledWith(
      "user_001",
      "group_001",
    );
    expect(sendMessageToGroup).toHaveBeenCalledWith(
      "group_001",
      "user_001",
      "this some cool shit man, yo".trim(),
    );
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await sendGroupMessageService(
      "user",
      "group_001",
      "this some cool shit man, yo",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).not.toHaveBeenCalledWith(
      "user",
      "group_001",
    );
    expect(sendMessageToGroup).not.toHaveBeenCalledWith(
      "group",
      "user_001",
      "this some cool shit man, yo".trim(),
    );
  });

  it("returns null if group does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(null);

    const result = await sendGroupMessageService(
      "user_001",
      "group",
      "this some cool shit man, yo",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group");
    expect(getGroupMemberByUserId).not.toHaveBeenCalledWith(
      "user_001",
      "group",
    );
    expect(sendMessageToGroup).not.toHaveBeenCalledWith(
      "group",
      "user_001",
      "this some cool shit man, yo".trim(),
    );
  });

  it("returns null if user is not in the group", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(group);
    vi.mocked(getGroupMemberByUserId).mockResolvedValueOnce(null);

    const result = await sendGroupMessageService(
      "user_001",
      "group_001",
      "this some cool shit man, yo",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).toHaveBeenCalledWith(
      "user_001",
      "group_001",
    );
    expect(sendMessageToGroup).not.toHaveBeenCalledWith(
      "group",
      "user_001",
      "this some cool shit man, yo".trim(),
    );
  });

  it("returns null if content is empty", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getGroupByGroupId).mockResolvedValueOnce(group);
    vi.mocked(getGroupMemberByUserId).mockResolvedValueOnce(null);

    const result = await sendGroupMessageService("user_001", "group_001", "");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getGroupByGroupId).toHaveBeenCalledWith("group_001");
    expect(getGroupMemberByUserId).toHaveBeenCalledWith(
      "user_001",
      "group_001",
    );
    expect(sendMessageToGroup).not.toHaveBeenCalledWith(
      "group",
      "user_001",
      "",
    );
  });
});
