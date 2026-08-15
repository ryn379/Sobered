export type SponsorStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "ENDED";

export interface Sponsor {
  id: string;
  sponsorId: string;
  menteeId: string;
  createdAt: string;
}

export interface SponsorRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export const sponsor: Sponsor[] = [
  {
    id: "sponsor_001",
    sponsorId: "user_004",
    menteeId: "user_002",
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "sponsor_002",
    sponsorId: "user_001",
    menteeId: "user_004",
    createdAt: "2026-08-14T10:00:00.000Z",
  },
];

export const sponsorRequests: SponsorRequest[] = [
  {
    id: "request_001",
    requesterId: "user_001",
    recipientId: "user_002",
    status: "pending",
    createdAt: "2026-08-14T10:30:00.000Z",
    updatedAt: "2026-08-14T10:30:00.000Z",
  },
  {
    id: "request_002",
    requesterId: "user_003",
    recipientId: "user_001",
    status: "accepted",
    createdAt: "2026-08-10T14:00:00.000Z",
    updatedAt: "2026-08-11T09:15:00.000Z",
  },
  {
    id: "request_003",
    requesterId: "user_004",
    recipientId: "user_002",
    status: "rejected",
    createdAt: "2026-08-08T16:45:00.000Z",
    updatedAt: "2026-08-09T11:20:00.000Z",
  },
  {
    id: "request_004",
    requesterId: "user_002",
    recipientId: "user_005",
    status: "pending",
    createdAt: "2026-08-15T08:00:00.000Z",
    updatedAt: "2026-08-15T08:00:00.000Z",
  },
];
