export interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export const groupMessages: GroupMessage[] = [
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
