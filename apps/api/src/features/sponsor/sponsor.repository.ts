import {
  type Sponsor,
  sponsor,
  type SponsorRequest,
  sponsorRequests,
} from "./sponsor.mock.js";

import { type User, users } from "../user/user.mock.js";

export const getSponsorByUserId = async (
  userId: string,
): Promise<User | null> => {
  const entry = sponsor.find((e) => e.menteeId === userId);

  if (!entry) return null;

  const sponsorEntry = users.find((e) => e.id === entry.sponsorId);

  return sponsorEntry ?? null;
};

export const getMenteeByUserId = async (userId: string): Promise<string[]> => {
  const entries = sponsor
    .filter((entry) => entry.sponsorId === userId)
    .map((entry) => entry.menteeId);

  return entries;
};

export const getSponsorReqsAllByUserId = async (
  userId: string,
): Promise<User[]> => {
  const entries = sponsorRequests.filter(
    (e) => e.recipientId === userId && e.status === "pending",
  );

  const userEntries: User[] = [];

  entries.forEach((e) => {
    const userEntry = users.find((entry) => entry.id === e.requesterId);
    if (userEntry) {
      userEntries.push(userEntry);
    }
  });

  return userEntries;
};

export const addSponsorRequestByUserId = async (
  userId: string,
  recipientId: string,
): Promise<SponsorRequest | null> => {
  const request: SponsorRequest = {
    id: `request_${String(sponsorRequests.length + 1).padStart(3, "0")}`,
    requesterId: userId,
    recipientId: recipientId,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  sponsorRequests.push(request);

  return request;
};

export const acceptSponsorRequestByReqId = async (
  reqId: string,
): Promise<SponsorRequest | null> => {
  const entry = sponsorRequests.find((e) => e.id === reqId);

  if (!entry) return null;

  entry.status = "accepted";
  entry.updatedAt = new Date().toISOString();

  return entry;
};

export const declineSponsorRequestByReqId = async (
  reqId: string,
): Promise<SponsorRequest | null> => {
  const entry = sponsorRequests.find((e) => e.id === reqId);

  if (!entry) {
    return null;
  }

  entry.status = "rejected";
  entry.updatedAt = new Date().toISOString();

  return entry;
};

export const addSponsorRelationship = async (
  menteeId: string,
  sponsorId: string,
): Promise<Sponsor> => {
  const relationship: Sponsor = {
    id: `sponsor_${String(sponsor.length + 1).padStart(3, "0")}`,
    sponsorId,
    menteeId,
    createdAt: new Date().toISOString(),
  };

  sponsor.push(relationship);

  return relationship;
};

export const getSponsorRequestByReqId = async (
  reqId: string,
): Promise<SponsorRequest | null> => {
  const request = sponsorRequests.find((e) => e.id === reqId);

  return request ?? null;
};

export const getPendingSponsorRequest = async (
  requesterId: string,
  recipientId: string,
): Promise<SponsorRequest | null> => {
  const request = sponsorRequests.find(
    (e) =>
      e.requesterId === requesterId &&
      e.recipientId === recipientId &&
      e.status === "pending",
  );

  return request ?? null;
};
