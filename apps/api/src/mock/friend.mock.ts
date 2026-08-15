export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: "PENDING" | "ACCEPTED";
  createdAt: string;
}

export const friendships: Friend[] = [
  {
    id: "friendship_001",
    userId: "user_001",
    friendId: "user_002",
    status: "ACCEPTED",
    createdAt: "2026-07-15T10:00:00.000Z",
  },
  {
    id: "friendship_002",
    userId: "user_001",
    friendId: "user_004",
    status: "ACCEPTED",
    createdAt: "2026-07-20T11:00:00.000Z",
  },
  {
    id: "friendship_003",
    userId: "user_002",
    friendId: "user_004",
    status: "PENDING",
    createdAt: "2026-08-14T12:00:00.000Z",
  },
];
