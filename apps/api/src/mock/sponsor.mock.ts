export type SponsorStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "ENDED";

export interface Sponsor {
  id: string;
  sponsorId: string;
  menteeId: string;
  status: SponsorStatus;
  createdAt: string;
}

export const sponsor: Sponsor[] = [
  {
    id: "sponsor_001",
    sponsorId: "user_004",
    menteeId: "user_002",
    status: "ACCEPTED",
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "sponsor_002",
    sponsorId: "user_001",
    menteeId: "user_004",
    status: "PENDING",
    createdAt: "2026-08-14T10:00:00.000Z",
  },
];
