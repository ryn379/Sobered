import {
  type Sponsor,
  sponsor,
  type SponsorRequest,
  sponsorRequests,
} from "./sponsor.mock.js";

import { type User, users } from "../user/user.mock.js";
import { findUserByUserId } from "../user/user.repository.js";

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
): Promise<SponsorRequest> => {
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
    console.log("Request not found");
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

export const getSponsorRequestByUserId = async (
  userId: string,
  requesterId: string,
): Promise<SponsorRequest | null> => {
  const request = sponsorRequests.find(
    (e) => e.requesterId === requesterId && e.recipientId === userId,
  );

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

export const getRandomUsers = async (userId: string): Promise<User[]> => {
  const availUsers = users.filter((e) => e.id !== userId);

  for (let i = availUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [availUsers[i], availUsers[j]] = [availUsers[j]!, availUsers[i]!];
  }

  return availUsers.slice(0, 10);
};

export const getOutgoingSponsorRequestsByUserId = async (
  userId: string,
): Promise<User[]> => {
  const requests = sponsorRequests.filter(
    (e) => e.requesterId === userId && e.status === "pending",
  );

  const requestUsers = (
    await Promise.all(
      requests.map(async (e) => {
        const user = await findUserByUserId(e.recipientId);

        return user;
      }),
    )
  ).filter((user) => user !== null);

  return requestUsers;
};
