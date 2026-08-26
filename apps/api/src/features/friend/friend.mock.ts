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
  {
    id: "friendship_003",
    userId: "user_002",
    friendId: "user_007",
    status: "ACCEPTED",
    createdAt: "2026-07-21T09:30:00.000Z",
  },
  {
    id: "friendship_004",
    userId: "user_002",
    friendId: "user_008",
    status: "ACCEPTED",
    createdAt: "2026-07-22T14:00:00.000Z",
  },
  {
    id: "friendship_005",
    userId: "user_004",
    friendId: "user_009",
    status: "ACCEPTED",
    createdAt: "2026-07-23T16:15:00.000Z",
  },
  {
    id: "friendship_006",
    userId: "user_004",
    friendId: "user_011",
    status: "ACCEPTED",
    createdAt: "2026-07-24T10:45:00.000Z",
  },
  {
    id: "friendship_007",
    userId: "user_005",
    friendId: "user_012",
    status: "ACCEPTED",
    createdAt: "2026-07-25T13:20:00.000Z",
  },
  {
    id: "friendship_008",
    userId: "user_007",
    friendId: "user_009",
    status: "ACCEPTED",
    createdAt: "2026-07-26T15:40:00.000Z",
  },
  {
    id: "friendship_009",
    userId: "user_008",
    friendId: "user_011",
    status: "ACCEPTED",
    createdAt: "2026-07-27T11:10:00.000Z",
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
  {
    id: "friend_request_005",
    requesterId: "user_001",
    recipientId: "user_007",
    status: "PENDING",
    createdAt: "2026-08-15T10:00:00.000Z",
    updatedAt: "2026-08-15T10:00:00.000Z",
  },
  {
    id: "friend_request_006",
    requesterId: "user_008",
    recipientId: "user_001",
    status: "PENDING",
    createdAt: "2026-08-16T12:30:00.000Z",
    updatedAt: "2026-08-16T12:30:00.000Z",
  },
  {
    id: "friend_request_007",
    requesterId: "user_009",
    recipientId: "user_006",
    status: "PENDING",
    createdAt: "2026-08-17T09:15:00.000Z",
    updatedAt: "2026-08-17T09:15:00.000Z",
  },
  {
    id: "friend_request_008",
    requesterId: "user_011",
    recipientId: "user_012",
    status: "DECLINED",
    createdAt: "2026-08-18T14:45:00.000Z",
    updatedAt: "2026-08-18T15:00:00.000Z",
  },
  {
    id: "friend_request_009",
    requesterId: "user_012",
    recipientId: "user_003",
    status: "PENDING",
    createdAt: "2026-08-19T16:20:00.000Z",
    updatedAt: "2026-08-19T16:20:00.000Z",
  },
];
