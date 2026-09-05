import { describe, it, expect, beforeEach } from "vitest";
import { getMessagesByGroupId } from "../../src/features/group/chat/groupMessage.repository.ts";
import { groupMessages } from "../../src/features/group/chat/groupMessage.mock";
import { sendMessageToGroup } from "../../src/features/group/chat/groupMessage.repository";

const initialMessages = structuredClone(groupMessages);

beforeEach(() => {
  groupMessages.length = 0;
  groupMessages.push(...structuredClone(initialMessages));
});

const messages = [
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

describe("getMessagesByGroupId", () => {
  it("returns messages by group id", async () => {
    const result = await getMessagesByGroupId("group_001");

    expect(result).toEqual(messages);
  });
});

describe("sendMessageToGroup", () => {
  it("posts messages to a group", async () => {
    const result = await sendMessageToGroup(
      "group_001",
      "user_001",
      "this some cool shit yo",
    );

    expect(result).toEqual({
      id: expect.any(String),
      groupId: "group_001",
      userId: "user_001",
      content: "this some cool shit yo",
      createdAt: expect.any(String),
    });

    const message = groupMessages.some((e) => e.id === result.id);

    expect(message).toBe(true);
  });
});
