export interface Sobriety {
  id: string;
  userId: string;
  startDate: string;
  longestStreak: number;
  totalMeetings: number;
  createdAt: string;
  updatedAt: string;
}

export interface SobrietyStats {
  currentStreak: number;
  longestStreak: number;
  totalDaysSober: number;
  totalSobrietyPeriods: number;
  totalMeetings: number;
  startDate: string;
}

export interface SobrietyHistory {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  createdAt: string;
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

export const sobrietyHistory: SobrietyHistory[] = [
  {
    id: "history_001",
    userId: "user_001",
    startDate: "2026-01-10",
    endDate: "2026-02-24",
    durationDays: 45,
    createdAt: "2026-02-24T10:00:00.000Z",
  },
  {
    id: "history_002",
    userId: "user_001",
    startDate: "2026-03-05",
    endDate: "2026-04-02",
    durationDays: 28,
    createdAt: "2026-04-02T10:00:00.000Z",
  },
];
