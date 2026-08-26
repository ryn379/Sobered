import {
  type Friend,
  friendships,
  type FriendRequest,
  friendRequests,
} from "./friend.mock.js";

import { type User, users } from "../user/user.mock.js";

export const getFriendAllByUserId = async (
  userId: string,
): Promise<Friend[]> => {
  const friends = friendships.filter(
    (e) => e.friendId === userId || e.userId === userId,
  );

  return friends;
};

export const getUsersFromFriendships = async (
  userId: string,
  friends: Friend[],
): Promise<User[]> => {
  const userFriends: User[] = [];

  friends.forEach((f) => {
    if (f.friendId !== userId) {
      const user = users.find((e) => e.id === f.friendId);
      if (user) userFriends.push(user);
    } else {
      const user = users.find((e) => e.id === f.userId);
      if (user) userFriends.push(user);
    }
  });

  return userFriends;
};

export const getFriendRequestsByUserId = async (
  userId: string,
): Promise<FriendRequest[]> => {
  const entries = friendRequests.filter(
    (e) => e.recipientId === userId && e.status === "PENDING",
  );

  return entries;
};

export const getUsersFromFriendRequests = async (
  requests: FriendRequest[],
): Promise<User[]> => {
  const entries: User[] = [];

  requests.forEach((f) => {
    const user = users.find((e) => e.id === f.requesterId);
    if (user) entries.push(user);
  });

  return entries;
};

export const postRequestFromUserId = async (
  userId: string,
  recipientId: string,
): Promise<FriendRequest> => {
  const request: FriendRequest = {
    id: `friend_request${String(friendRequests.length + 1).padStart(3, "0")}`,
    requesterId: userId,
    recipientId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  friendRequests.push(request);

  return request;
};

export const deleteFriendByUserId = async (
  userId: string,
  friendId: string,
): Promise<Friend | null> => {
  const idx = friendships.findIndex(
    (e) =>
      (e.userId === userId && e.friendId === friendId) ||
      (e.userId === friendId && e.friendId === userId),
  );

  if (idx === -1) {
    return null;
  }
  const [deletedFriendship] = friendships.splice(idx, 1);
  if (deletedFriendship) deletedFriendship.status = "REVOKED";
  return deletedFriendship ?? null;
};

export const acceptFriendRequestByUserId = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest | null> => {
  const request = friendRequests.find(
    (e) =>
      e.requesterId === requesterId &&
      e.recipientId === userId &&
      e.status === "PENDING",
  );

  if (!request) return null;

  request.status = "ACCEPTED";
  request.updatedAt = new Date().toISOString();

  return request;
};

export const addFriendship = async (
  userId: string,
  friendId: string,
): Promise<Friend> => {
  const friendship: Friend = {
    id: `friendship_${String(friendships.length + 1).padStart(3, "0")}`,
    userId,
    friendId,
    status: "ACCEPTED",
    createdAt: new Date().toISOString(),
  };

  friendships.push(friendship);

  return friendship;
};

export const declineFriendRequestByUserId = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest | null> => {
  const request = friendRequests.find(
    (e) =>
      e.requesterId === requesterId &&
      e.recipientId === userId &&
      e.status === "PENDING",
  );

  if (!request) return null;

  request.status = "DECLINED";
  request.updatedAt = new Date().toISOString();

  return request;
};

export const getSentFriendRequestsByUserId = async (
  userId: string,
): Promise<FriendRequest[]> => {
  return friendRequests.filter(
    (e) => e.requesterId === userId && e.status === "PENDING",
  );
};
