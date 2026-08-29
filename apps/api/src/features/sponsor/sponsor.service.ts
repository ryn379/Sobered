import type { Sponsor, SponsorRequest } from "./sponsor.mock.js";
import type { User } from "../user/user.mock.js";

import {
  acceptSponsorRequestByReqId,
  addSponsorRelationship,
  addSponsorRequestByUserId,
  declineSponsorRequestByReqId,
  getMenteeByUserId,
  getOutgoingSponsorRequestsByUserId,
  getPendingSponsorRequest,
  getRandomUsers,
  getSponsorByUserId,
  getSponsorReqsAllByUserId,
  getSponsorRequestByUserId,
} from "./sponsor.repository.js";
import { findUserByUserId } from "../user/user.repository.js";
import { getFriendAllByUserId } from "../friend/friend.repository.js";

export const getSponsorService = async (
  userId: string,
): Promise<User | null | User[]> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User does not exist");
    return null;
  }
  const entry = await getSponsorByUserId(userId);

  if (!entry) {
    console.log("No sponsor");
    return new Array<User>();
  }

  return entry;
};

export const getReqsService = async (userId: string): Promise<User[]> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    return Array<User>();
  }

  const entries = await getSponsorReqsAllByUserId(userId);

  return entries;
};

export const postReqService = async (
  userId: string,
  recipientId: string,
): Promise<SponsorRequest | null> => {
  if (userId === recipientId) return null;

  const requester = await findUserByUserId(userId);
  const sponsor = await getSponsorByUserId(userId);
  const recipient = await findUserByUserId(recipientId);

  if (!requester || !recipient) {
    console.log("Requester or recipient does not exist");
    return null;
  }

  if (sponsor) {
    console.log("Already has a sponsor");
    return null;
  }

  const existingRequest = await getPendingSponsorRequest(userId, recipientId);

  if (existingRequest) {
    console.log("Request already exists");
    return null;
  }

  const entry = await addSponsorRequestByUserId(userId, recipientId);
  return entry;
};

export const acceptReqService = async (
  userId: string,
  requesterId: string,
): Promise<SponsorRequest | null> => {
  const user = await findUserByUserId(userId);
  const requester = await findUserByUserId(requesterId);

  if (!requester || !user) {
    console.log("User or Requester not found");
    return null;
  }

  if (requester === user) {
    console.log("Cannot send to yourself");
    return null;
  }

  const request = await getSponsorRequestByUserId(userId, requesterId);

  if (!request) {
    console.log("Request does not exist");
    return null;
  }

  if (request.status !== "pending") {
    console.log("Request is not pending");
    return null;
  }

  const updatedRequest = await acceptSponsorRequestByReqId(request.id);

  if (!updatedRequest) {
    return null;
  }

  await addSponsorRelationship(
    updatedRequest.requesterId,
    updatedRequest.recipientId,
  );

  return updatedRequest;
};

export const declineReqService = async (
  userId: string,
  requesterId: string,
): Promise<SponsorRequest | null> => {
  const user = await findUserByUserId(userId);
  const requester = await findUserByUserId(requesterId);

  if (!user || !requester) {
    console.log("User or Requester not found");
    return null;
  }

  const request = await getSponsorRequestByUserId(userId, requesterId);

  if (!request) {
    console.log("request does not exist");
    return null;
  }

  if (request.status !== "pending") {
    console.log("request is not pending");
    return null;
  }

  return declineSponsorRequestByReqId(request.id);
};

export const getMenteeService = async (userId: string): Promise<User[]> => {
  const menteeIds = await getMenteeByUserId(userId);

  const mentees = (
    await Promise.all(
      menteeIds.map(async (e) => {
        const user = await findUserByUserId(e);

        return user;
      }),
    )
  ).filter((user) => user !== null);

  return mentees;
};

export const getSuggestionsSponsorService = async (
  userId: string,
): Promise<User[]> => {
  const users = await getRandomUsers(userId);

  const requests = await getOutgoingSponsorRequestsByUserId(userId);

  const requestsIds = requests.map((e) => e.id);

  const filteredUsers = users.filter((e) => !requestsIds.includes(e.id));

  return filteredUsers;
};
