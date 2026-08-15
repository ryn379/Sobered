export interface HALTEntry {
  id: string;
  userId: string;
  hungry: number;
  angry: number;
  lonely: number;
  tired: number;
  notes: string;
  createdAt: string;
}

export const haltEntries: HALTEntry[] = [
  {
    id: "halt_001",
    userId: "user_001",
    hungry: 2,
    angry: 3,
    lonely: 5,
    tired: 4,
    notes: "Feeling isolated after work.",
    createdAt: "2026-08-10T18:00:00.000Z",
  },
  {
    id: "halt_002",
    userId: "user_001",
    hungry: 4,
    angry: 2,
    lonely: 2,
    tired: 5,
    notes: "Didn't sleep well last night.",
    createdAt: "2026-08-12T20:00:00.000Z",
  },
];
