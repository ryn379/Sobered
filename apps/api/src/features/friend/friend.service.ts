import { type Friend, type FriendRequest, friendships } from "./friend.mock.js";
import { type User, users } from "../user/user.mock.js";
import {
  acceptFriendRequestByUserId,
  addFriendship,
  declineFriendRequestByUserId,
  deleteFriendByUserId,
  getFriendAllByUserId,
  getFriendRequestsByUserId,
  getUsersFromFriendRequests,
  getUsersFromFriendships,
  postRequestFromUserId,
} from "./friend.repository.js";
import { findUserByUserId } from "../user/user.repository.js";

export const getFriendsService = async (userId: string): Promise<User[]> => {
  const friends = await getFriendAllByUserId(userId);

  const userFriends = await getUsersFromFriendships(userId, friends);

  return userFriends;
};

export const getFriendRequestService = async (
  userId: string,
): Promise<User[]> => {
  const requests = await getFriendRequestsByUserId(userId);

  const userRequests = await getUsersFromFriendRequests(requests);

  return userRequests;
};

export const postFriendRequestService = async (
  userId: string,
  recipientId: string,
): Promise<FriendRequest | null> => {
  if (userId === recipientId) return null;

  const user = await findUserByUserId(userId);
  const recipient = await findUserByUserId(recipientId);

  if (!user || !recipient) {
    console.log("User or Recipient Does not Exist");
    return null;
  }
  if (user.role !== recipient.role) {
    console.log("Different Roles");
    return null;
  }

  const friends = await getFriendAllByUserId(userId);

  const alreadyFriends = friends.find(
    (e) =>
      (e.friendId === userId && e.userId === recipientId) ||
      (e.userId === userId && e.friendId === recipientId),
  );

  if (alreadyFriends) {
    console.log("already Friends");
    return null;
  }

  const requestsRecipient = await getFriendRequestsByUserId(recipientId);
  const requestsUser = await getFriendRequestsByUserId(userId);

  const alreadySentRequest = requestsRecipient.find(
    (e) => e.recipientId === recipientId && e.requesterId === userId,
  );

  const alreadyIncomingRequest = requestsUser.find(
    (e) => e.recipientId === userId && e.requesterId === recipientId,
  );

  if (alreadySentRequest || alreadyIncomingRequest) {
    console.log("Already Incoming or Outgoing Requests");
    return null;
  }

  const request = await postRequestFromUserId(userId, recipientId);

  return request;
};

export const deleteFriendService = async (
  userId: string,
  friendId: string,
): Promise<Friend | null> => {
  const user = await findUserByUserId(userId);
  const friend = await findUserByUserId(friendId);

  if (!user || !friend) return null;

  const userFriends = await getFriendAllByUserId(userId);

  const areFriend = userFriends.find(
    (e) =>
      (e.userId === userId && e.friendId === friendId) ||
      (e.userId === friendId && e.friendId === userId),
  );

  if (!areFriend) {
    console.log("Not Friends");
    return null;
  }

  const entry = await deleteFriendByUserId(userId, friendId);
  return entry ?? null;
};

export const acceptFriendService = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest | null> => {
  if (userId === requesterId) {
    console.log("same user");
    return null;
  }
  const user = await findUserByUserId(userId);
  const requester = await findUserByUserId(requesterId);

  if (!user || !requester) {
    console.log("User Does Not Exist");
    return null;
  }

  const userFriends = await getFriendAllByUserId(userId);

  const alreadyFriends = userFriends.find(
    (e) =>
      (e.friendId === userId && e.userId === requesterId) ||
      (e.friendId === requesterId && e.userId === userId),
  );

  if (alreadyFriends) {
    console.log("Already Friends");
    return null;
  }

  const request = await acceptFriendRequestByUserId(userId, requesterId);

  if (!request) {
    console.log("Friend Request Does Not Exist");
    return null;
  }

  await addFriendship(userId, requesterId);

  return request;
};

export const declineFriendService = async (
  userId: string,
  requesterId: string,
): Promise<FriendRequest | null> => {
  if (userId === requesterId) {
    console.log("same user");
    return null;
  }
  const user = await findUserByUserId(userId);
  const requester = await findUserByUserId(requesterId);

  if (!user || !requester) {
    console.log("User Does Not Exist");
    return null;
  }

  const userFriends = await getFriendAllByUserId(userId);

  const alreadyFriends = userFriends.find(
    (e) =>
      (e.friendId === userId && e.userId === requesterId) ||
      (e.friendId === requesterId && e.userId === userId),
  );

  if (alreadyFriends) {
    console.log("Already Friends");
    return null;
  }

  const request = await declineFriendRequestByUserId(userId, requesterId);

  if (!request) {
    console.log("Friend Request Does Not Exist");
    return null;
  }

  return request;
};
