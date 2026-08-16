export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: "ACCEPTED" | "REVOKED";
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  createdAt: string;
  updatedAt: string;
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
];

export const friendRequests: FriendRequest[] = [
  {
    id: "friend_request_001",
    requesterId: "user_002",
    recipientId: "user_001",
    status: "ACCEPTED",
    createdAt: "2026-08-10T09:30:00.000Z",
    updatedAt: "2026-08-10T09:30:00.000Z",
  },
  {
    id: "friend_request_002",
    requesterId: "user_005",
    recipientId: "user_001",
    status: "PENDING",
    createdAt: "2026-08-12T14:00:00.000Z",
    updatedAt: "2026-08-12T14:00:00.000Z",
  },
  {
    id: "friend_request_003",
    requesterId: "user_001",
    recipientId: "user_004",
    status: "ACCEPTED",
    createdAt: "2026-08-05T11:00:00.000Z",
    updatedAt: "2026-08-05T11:30:00.000Z",
  },
  {
    id: "friend_request_004",
    requesterId: "user_004",
    recipientId: "user_005",
    status: "DECLINED",
    createdAt: "2026-08-07T16:00:00.000Z",
    updatedAt: "2026-08-08T10:15:00.000Z",
  },
];
