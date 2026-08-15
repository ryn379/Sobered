export interface Sobriety {
  id: string;
  userId: string;
  startDate: string;
  longestStreak: number;
  totalMeetings: number;
  createdAt: string;
  updatedAt: string;
}

export const sobrietyRecords: Sobriety[] = [
  {
    id: "sobriety_001",
    userId: "user_001",
    startDate: "2026-07-01",
    longestStreak: 45,
    totalMeetings: 12,
    createdAt: "2026-07-01T10:00:00.000Z",
    updatedAt: "2026-08-15T08:00:00.000Z",
  },
  {
    id: "sobriety_002",
    userId: "user_002",
    startDate: "2026-08-01",
    longestStreak: 14,
    totalMeetings: 4,
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedAt: "2026-08-15T08:00:00.000Z",
  },
  {
    id: "sobriety_003",
    userId: "user_004",
    startDate: "2026-06-15",
    longestStreak: 61,
    totalMeetings: 21,
    createdAt: "2026-06-15T11:00:00.000Z",
    updatedAt: "2026-08-15T07:30:00.000Z",
  },
];
