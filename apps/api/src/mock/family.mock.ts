export interface Family {
  id: string;
  recoveringUserId: string;
  familyUserId: string;
  status: "PENDING" | "CONNECTED";
  createdAt: string;
}

export const family: Family[] = [
  {
    id: "family_001",
    recoveringUserId: "user_001",
    familyUserId: "user_003",
    status: "CONNECTED",
    createdAt: "2026-07-15T10:00:00.000Z",
  },
];
