import type { Sponsor, SponsorRequest } from "./sponsor.mock.js";
import type { User } from "../user/user.mock.js";

import {
  acceptSponsorRequestByReqId,
  addSponsorRelationship,
  addSponsorRequestByUserId,
  declineSponsorRequestByReqId,
  getSponsorByUserId,
  getSponsorReqsAllByUserId,
} from "./sponsor.repository.js";

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
  const entry = await addSponsorRequestByUserId(userId, recipientId);

  return entry;
};

export const acceptReqService = async (
  reqId: string,
): Promise<SponsorRequest | null> => {
  const request = await acceptSponsorRequestByReqId(reqId);

  if (!request) {
    return null;
  }

  await addSponsorRelationship(request.requesterId, request.recipientId);

  return request;
};

export const declineReqService = async (
  reqId: string,
): Promise<SponsorRequest | null> => {
  const request = await declineSponsorRequestByReqId(reqId);

  if (!request) {
    return null;
  }

  return request;
};
