export interface Group {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface GroupMember {
  groupId: string;
  userId: string;
  role: "MEMBER" | "LEADER";
  joinedAt: string;
}

export const groups: Group[] = [
  {
    id: "group_001",
    name: "Starting Again",
    description:
      "A welcoming group for people in the early stages of recovery.",
    createdBy: "user_001",
    createdAt: "2026-07-05T10:00:00.000Z",
  },
  {
    id: "group_002",
    name: "One Day At A Time",
    description: "A general recovery group focused on daily accountability.",
    createdBy: "user_004",
    createdAt: "2026-07-08T13:00:00.000Z",
  },
];

export const groupMembers: GroupMember[] = [
  {
    groupId: "group_001",
    userId: "user_001",
    role: "LEADER",
    joinedAt: "2026-07-05T10:00:00.000Z",
  },
  {
    groupId: "group_001",
    userId: "user_002",
    role: "MEMBER",
    joinedAt: "2026-07-10T10:00:00.000Z",
  },
  {
    groupId: "group_002",
    userId: "user_004",
    role: "LEADER",
    joinedAt: "2026-07-08T13:00:00.000Z",
  },
  {
    groupId: "group_002",
    userId: "user_001",
    role: "MEMBER",
    joinedAt: "2026-07-12T13:00:00.000Z",
  },
];
