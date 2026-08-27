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
  {
    id: "sponsor_003",
    sponsorId: "user_007",
    menteeId: "user_005",
    createdAt: "2026-08-06T09:30:00.000Z",
  },
  {
    id: "sponsor_004",
    sponsorId: "user_009",
    menteeId: "user_006",
    createdAt: "2026-08-08T11:00:00.000Z",
  },
  {
    id: "sponsor_005",
    sponsorId: "user_011",
    menteeId: "user_008",
    createdAt: "2026-08-10T14:00:00.000Z",
  },
  {
    id: "sponsor_006",
    sponsorId: "user_012",
    menteeId: "user_010",
    createdAt: "2026-08-12T10:30:00.000Z",
  },
  {
    id: "sponsor_007",
    sponsorId: "user_004",
    menteeId: "user_013",
    createdAt: "2026-08-16T10:00:00.000Z",
  },
  {
    id: "sponsor_008",
    sponsorId: "user_001",
    menteeId: "user_014",
    createdAt: "2026-08-17T11:30:00.000Z",
  },
];

export const sponsorRequests: SponsorRequest[] = [
  {
    id: "request_001",
    requesterId: "user_002",
    recipientId: "user_004",
    status: "accepted",
    createdAt: "2026-08-05T09:30:00.000Z",
    updatedAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "request_002",
    requesterId: "user_004",
    recipientId: "user_001",
    status: "accepted",
    createdAt: "2026-08-14T09:30:00.000Z",
    updatedAt: "2026-08-14T10:00:00.000Z",
  },
  {
    id: "request_003",
    requesterId: "user_003",
    recipientId: "user_001",
    status: "rejected",
    createdAt: "2026-08-08T16:45:00.000Z",
    updatedAt: "2026-08-09T11:20:00.000Z",
  },
  {
    id: "request_004",
    requesterId: "user_005",
    recipientId: "user_007",
    status: "accepted",
    createdAt: "2026-08-06T09:00:00.000Z",
    updatedAt: "2026-08-06T09:30:00.000Z",
  },
  {
    id: "request_005",
    requesterId: "user_006",
    recipientId: "user_009",
    status: "accepted",
    createdAt: "2026-08-08T10:30:00.000Z",
    updatedAt: "2026-08-08T11:00:00.000Z",
  },
  {
    id: "request_006",
    requesterId: "user_008",
    recipientId: "user_011",
    status: "accepted",
    createdAt: "2026-08-10T13:30:00.000Z",
    updatedAt: "2026-08-10T14:00:00.000Z",
  },
  {
    id: "request_007",
    requesterId: "user_010",
    recipientId: "user_012",
    status: "accepted",
    createdAt: "2026-08-12T10:00:00.000Z",
    updatedAt: "2026-08-12T10:30:00.000Z",
  },
  {
    id: "request_008",
    requesterId: "user_013",
    recipientId: "user_004",
    status: "accepted",
    createdAt: "2026-08-16T09:30:00.000Z",
    updatedAt: "2026-08-16T10:00:00.000Z",
  },
  {
    id: "request_009",
    requesterId: "user_014",
    recipientId: "user_001",
    status: "accepted",
    createdAt: "2026-08-17T11:00:00.000Z",
    updatedAt: "2026-08-17T11:30:00.000Z",
  },
  {
    id: "request_010",
    requesterId: "user_015",
    recipientId: "user_004",
    status: "pending",
    createdAt: "2026-08-18T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },
  {
    id: "request_011",
    requesterId: "user_003",
    recipientId: "user_004",
    status: "pending",
    createdAt: "2026-08-18T14:00:00.000Z",
    updatedAt: "2026-08-18T14:00:00.000Z",
  },
  {
    id: "request_012",
    requesterId: "user_015",
    recipientId: "user_001",
    status: "pending",
    createdAt: "2026-08-19T10:30:00.000Z",
    updatedAt: "2026-08-19T10:30:00.000Z",
  },
  {
    id: "request_013",
    requesterId: "user_003",
    recipientId: "user_007",
    status: "rejected",
    createdAt: "2026-08-11T15:00:00.000Z",
    updatedAt: "2026-08-12T09:00:00.000Z",
  },
  {
    id: "request_014",
    requesterId: "user_015",
    recipientId: "user_012",
    status: "rejected",
    createdAt: "2026-08-13T16:00:00.000Z",
    updatedAt: "2026-08-14T10:00:00.000Z",
  },
];
