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
    userId: "user_003",
    startDate: "2026-07-15",
    longestStreak: 42,
    totalMeetings: 9,
    createdAt: "2026-07-15T09:30:00.000Z",
    updatedAt: "2026-08-15T08:30:00.000Z",
  },
  {
    id: "sobriety_004",
    userId: "user_004",
    startDate: "2026-06-15",
    longestStreak: 61,
    totalMeetings: 21,
    createdAt: "2026-06-15T11:00:00.000Z",
    updatedAt: "2026-08-15T07:30:00.000Z",
  },
  {
    id: "sobriety_005",
    userId: "user_005",
    startDate: "2026-07-12",
    longestStreak: 39,
    totalMeetings: 15,
    createdAt: "2026-07-12T10:00:00.000Z",
    updatedAt: "2026-08-15T09:00:00.000Z",
  },
  {
    id: "sobriety_006",
    userId: "user_006",
    startDate: "2026-08-05",
    longestStreak: 10,
    totalMeetings: 3,
    createdAt: "2026-08-05T12:00:00.000Z",
    updatedAt: "2026-08-15T10:00:00.000Z",
  },
  {
    id: "sobriety_007",
    userId: "user_007",
    startDate: "2026-05-20",
    longestStreak: 88,
    totalMeetings: 27,
    createdAt: "2026-05-20T08:30:00.000Z",
    updatedAt: "2026-08-15T07:00:00.000Z",
  },
  {
    id: "sobriety_008",
    userId: "user_008",
    startDate: "2026-07-25",
    longestStreak: 25,
    totalMeetings: 8,
    createdAt: "2026-07-25T11:30:00.000Z",
    updatedAt: "2026-08-15T08:15:00.000Z",
  },
  {
    id: "sobriety_009",
    userId: "user_009",
    startDate: "2026-06-01",
    longestStreak: 76,
    totalMeetings: 18,
    createdAt: "2026-06-01T10:30:00.000Z",
    updatedAt: "2026-08-15T07:45:00.000Z",
  },
  {
    id: "sobriety_010",
    userId: "user_010",
    startDate: "2026-08-10",
    longestStreak: 7,
    totalMeetings: 2,
    createdAt: "2026-08-10T09:00:00.000Z",
    updatedAt: "2026-08-15T09:30:00.000Z",
  },
  {
    id: "sobriety_011",
    userId: "user_011",
    startDate: "2026-04-15",
    longestStreak: 103,
    totalMeetings: 34,
    createdAt: "2026-04-15T10:00:00.000Z",
    updatedAt: "2026-08-15T06:45:00.000Z",
  },
  {
    id: "sobriety_012",
    userId: "user_012",
    startDate: "2026-07-05",
    longestStreak: 51,
    totalMeetings: 13,
    createdAt: "2026-07-05T11:00:00.000Z",
    updatedAt: "2026-08-15T08:45:00.000Z",
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
  {
    id: "history_003",
    userId: "user_002",
    startDate: "2026-06-01",
    endDate: "2026-06-18",
    durationDays: 17,
    createdAt: "2026-06-18T10:00:00.000Z",
  },
  {
    id: "history_004",
    userId: "user_003",
    startDate: "2026-05-01",
    endDate: "2026-06-10",
    durationDays: 40,
    createdAt: "2026-06-10T10:00:00.000Z",
  },
  {
    id: "history_005",
    userId: "user_004",
    startDate: "2026-03-01",
    endDate: "2026-04-15",
    durationDays: 45,
    createdAt: "2026-04-15T10:00:00.000Z",
  },
  {
    id: "history_006",
    userId: "user_005",
    startDate: "2026-05-10",
    endDate: "2026-06-15",
    durationDays: 36,
    createdAt: "2026-06-15T10:00:00.000Z",
  },
  {
    id: "history_007",
    userId: "user_006",
    startDate: "2026-07-01",
    endDate: "2026-07-20",
    durationDays: 19,
    createdAt: "2026-07-20T10:00:00.000Z",
  },
  {
    id: "history_008",
    userId: "user_007",
    startDate: "2026-02-01",
    endDate: "2026-04-20",
    durationDays: 78,
    createdAt: "2026-04-20T10:00:00.000Z",
  },
  {
    id: "history_009",
    userId: "user_008",
    startDate: "2026-06-01",
    endDate: "2026-06-28",
    durationDays: 27,
    createdAt: "2026-06-28T10:00:00.000Z",
  },
  {
    id: "history_010",
    userId: "user_009",
    startDate: "2026-02-15",
    endDate: "2026-04-30",
    durationDays: 74,
    createdAt: "2026-04-30T10:00:00.000Z",
  },
  {
    id: "history_011",
    userId: "user_010",
    startDate: "2026-07-01",
    endDate: "2026-07-18",
    durationDays: 17,
    createdAt: "2026-07-18T10:00:00.000Z",
  },
  {
    id: "history_012",
    userId: "user_011",
    startDate: "2026-01-05",
    endDate: "2026-03-20",
    durationDays: 74,
    createdAt: "2026-03-20T10:00:00.000Z",
  },
  {
    id: "history_013",
    userId: "user_012",
    startDate: "2026-05-15",
    endDate: "2026-06-25",
    durationDays: 41,
    createdAt: "2026-06-25T10:00:00.000Z",
  },
];
