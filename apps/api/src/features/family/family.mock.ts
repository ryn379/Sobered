export interface Family {
  id: string;
  recoveringUserId: string;
  familyUserId: string;
  status: "PENDING" | "CONNECTED";
  createdAt: string;
}

export const families: Family[] = [
  {
    id: "family_001",
    recoveringUserId: "user_001",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-07-15T10:00:00.000Z",
  },
  {
    id: "family_002",
    recoveringUserId: "user_002",
    familyUserId: "user_006",
    status: "CONNECTED",
    createdAt: "2026-07-18T11:30:00.000Z",
  },
  {
    id: "family_003",
    recoveringUserId: "user_004",
    familyUserId: "user_006",
    status: "CONNECTED",
    createdAt: "2026-07-22T09:00:00.000Z",
  },
  {
    id: "family_004",
    recoveringUserId: "user_005",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-07-25T14:00:00.000Z",
  },
  {
    id: "family_005",
    recoveringUserId: "user_007",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-07-28T16:30:00.000Z",
  },
  {
    id: "family_006",
    recoveringUserId: "user_008",
    familyUserId: "user_006",
    status: "CONNECTED",
    createdAt: "2026-08-01T10:30:00.000Z",
  },
  {
    id: "family_007",
    recoveringUserId: "user_009",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-08-03T12:00:00.000Z",
  },
  {
    id: "family_008",
    recoveringUserId: "user_010",
    familyUserId: "user_006",
    status: "CONNECTED",
    createdAt: "2026-08-05T15:00:00.000Z",
  },
  {
    id: "family_009",
    recoveringUserId: "user_011",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-08-07T09:30:00.000Z",
  },
  {
    id: "family_010",
    recoveringUserId: "user_012",
    familyUserId: "user_006",
    status: "CONNECTED",
    createdAt: "2026-08-10T11:00:00.000Z",
  },
  {
    id: "family_011",
    recoveringUserId: "user_001",
    familyUserId: "user_006",
    status: "PENDING",
    createdAt: "2026-08-12T13:00:00.000Z",
  },
  {
    id: "family_012",
    recoveringUserId: "user_004",
    familyUserId: "user_003",
    status: "PENDING",
    createdAt: "2026-08-14T17:00:00.000Z",
  },
  {
    id: "family_013",
    recoveringUserId: "user_007",
    familyUserId: "user_006",
    status: "PENDING",
    createdAt: "2026-08-16T10:00:00.000Z",
  },
];
