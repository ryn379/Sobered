import { type Friend, type FriendRequest } from "./friend.mock.js";
import { type User } from "../user/user.mock.js";
import {
  acceptFriendRequestByUserId,
  addFriendship,
  declineFriendRequestByUserId,
  deleteFriendByUserId,
  getFriendAllByUserId,
  getFriendRequestsByUserId,
  getSentFriendRequestsByUserId,
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
  if (userId === recipientId) {
    return null;
  }

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

  const friendships = await getFriendAllByUserId(userId);

  const alreadyFriends = friendships.some(
    (friendship) =>
      (friendship.userId === userId && friendship.friendId === recipientId) ||
      (friendship.userId === recipientId && friendship.friendId === userId),
  );

  if (alreadyFriends) {
    console.log("Already Friends");
    return null;
  }

  const incomingRequests = await getFriendRequestsByUserId(userId);

  const outgoingRequests = await getSentFriendRequestsByUserId(userId);

  const alreadyIncomingRequest = incomingRequests.some(
    (request) =>
      request.requesterId === recipientId && request.recipientId === userId,
  );

  const alreadyOutgoingRequest = outgoingRequests.some(
    (request) =>
      request.requesterId === userId && request.recipientId === recipientId,
  );

  if (alreadyIncomingRequest || alreadyOutgoingRequest) {
    console.log("Already Incoming or Outgoing Request");
    return null;
  }

  return postRequestFromUserId(userId, recipientId);
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

export const getSuggestionFriendsService = async (
  userId: string,
): Promise<User[]> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    return [];
  }

  const directFriendships = await getFriendAllByUserId(userId);

  const directFriendIds = directFriendships.map((f) =>
    f.userId === userId ? f.friendId : f.userId,
  );

  // sent friend requests
  const sentRequests = await getSentFriendRequestsByUserId(userId);

  const sentRequestIds = sentRequests.map((request) => request.recipientId);

  // received friend requests
  const receivedRequests = await getFriendRequestsByUserId(userId);

  const receivedRequestIds = receivedRequests.map(
    (request) => request.requesterId,
  );

  // friends of friends
  const secondFriends = await Promise.all(
    directFriendIds.map(async (directFriendId) => {
      const edges = await getFriendAllByUserId(directFriendId);

      return {
        directFriendId,
        edges,
      };
    }),
  );

  const suggestionIds = new Set<string>();

  secondFriends.forEach(({ directFriendId, edges }) => {
    edges.forEach((edge) => {
      let candidateId: string | null = null;

      if (edge.userId === directFriendId) {
        candidateId = edge.friendId;
      } else if (edge.friendId === directFriendId) {
        candidateId = edge.userId;
      }

      if (!candidateId) return;

      if (candidateId === userId) return; // remove the user

      if (directFriendIds.includes(candidateId)) return; // remove already friends

      if (sentRequestIds.includes(candidateId)) return; // remove outgoing friend requests

      if (receivedRequestIds.includes(candidateId)) return; // remove incoming requests

      suggestionIds.add(candidateId);
    });
  });

  const suggestions = await Promise.all(
    Array.from(suggestionIds).map((candidateId) =>
      findUserByUserId(candidateId),
    ),
  );

  return suggestions.filter((entry): entry is User => entry !== null);
};
