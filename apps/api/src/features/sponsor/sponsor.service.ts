import type { Sponsor, SponsorRequest } from "./sponsor.mock.js";
import type { User } from "../user/user.mock.js";

import {
  acceptSponsorRequestByReqId,
  addSponsorRelationship,
  addSponsorRequestByUserId,
  declineSponsorRequestByReqId,
  getPendingSponsorRequest,
  getSponsorByUserId,
  getSponsorReqsAllByUserId,
  getSponsorRequestByReqId,
} from "./sponsor.repository.js";
import { findUserByUserId } from "../user/user.repository.js";

export const getSponsorService = async (
  userId: string,
): Promise<User | null> => {
  const entry = await getSponsorByUserId(userId);

  return entry;
};

export const getReqsService = async (userId: string): Promise<User[]> => {
  const entries = await getSponsorReqsAllByUserId(userId);

  return entries;
};

export const postReqServiece = async (
  userId: string,
  recipientId: string,
): Promise<SponsorRequest | null> => {
  if (userId === recipientId) return null;

  const sponsor = await getSponsorByUserId(userId);
  const requester = await findUserByUserId(userId);
  const recipient = await findUserByUserId(recipientId);

  if (!requester || !recipient) return null;

  if (sponsor) return null;

  const existingRequest = await getPendingSponsorRequest(userId, recipientId);

  if (existingRequest) return null;

  const entry = await addSponsorRequestByUserId(userId, recipientId);
  return entry;
};

export const acceptReqService = async (
  userId: string,
  reqId: string,
): Promise<SponsorRequest | null> => {
  const request = await getSponsorRequestByReqId(reqId);

  if (!request) {
    return null;
  }

  if (request.recipientId !== userId) {
    return null;
  }

  if (request.status !== "pending") {
    return null;
  }

  const updatedRequest = await acceptSponsorRequestByReqId(reqId);

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
  reqId: string,
): Promise<SponsorRequest | null> => {
  const request = await getSponsorRequestByReqId(reqId);

  if (!request) {
    return null;
  }

  if (request.recipientId !== userId) {
    return null;
  }

  if (request.status !== "pending") {
    return null;
  }

  return declineSponsorRequestByReqId(reqId);
};
