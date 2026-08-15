export type MeetingType = "RECOVERY" | "FAMILY";

export interface Meeting {
  id: string;
  groupId: string;
  title: string;
  description: string;
  type: MeetingType;
  scheduledAt: string;
  durationMinutes: number;
  createdAt: string;
}

export interface MeetingParticipant {
  meetingId: string;
  userId: string;
  joinedAt: string;
}

export const meetings: Meeting[] = [
  {
    id: "meeting_001",
    groupId: "group_001",
    title: "Evening Recovery Meeting",
    description: "An anonymous meeting to discuss difficulties and progress.",
    type: "RECOVERY",
    scheduledAt: "2026-08-15T18:00:00.000Z",
    durationMinutes: 60,
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "meeting_002",
    groupId: "group_002",
    title: "Daily Check-In",
    description: "Short daily meeting focused on accountability.",
    type: "RECOVERY",
    scheduledAt: "2026-08-15T20:00:00.000Z",
    durationMinutes: 45,
    createdAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "meeting_003",
    groupId: "group_002",
    title: "Family Support Circle",
    description: "A private meeting for family members affected by alcoholism.",
    type: "FAMILY",
    scheduledAt: "2026-08-16T17:00:00.000Z",
    durationMinutes: 60,
    createdAt: "2026-08-05T10:00:00.000Z",
  },
];

export const meetingParticipants: MeetingParticipant[] = [
  {
    meetingId: "meeting_001",
    userId: "user_001",
    joinedAt: "2026-08-15T18:01:00.000Z",
  },
  {
    meetingId: "meeting_001",
    userId: "user_002",
    joinedAt: "2026-08-15T18:02:00.000Z",
  },
];
