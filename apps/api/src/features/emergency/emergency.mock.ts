export type EmergencyType =
  | "CRAVING"
  | "EMOTIONAL_SUPPORT"
  | "PROFESSIONAL_HELP";

export type EmergencyStatus = "OPEN" | "ACCEPTED" | "CLOSED" | "ESCALATED";

export interface EmergencyRequest {
  id: string;
  userId: string;
  type: EmergencyType;
  status: EmergencyStatus;
  acceptedBy?: string;
  createdAt: string;
  closedAt?: string;
}

export const emergencyRequests: EmergencyRequest[] = [
  {
    id: "emergency_001",
    userId: "user_002",
    type: "CRAVING",
    status: "OPEN",
    createdAt: "2026-08-15T08:30:00.000Z",
  },
  {
    id: "emergency_002",
    userId: "user_001",
    type: "EMOTIONAL_SUPPORT",
    status: "ACCEPTED",
    acceptedBy: "user_004",
    createdAt: "2026-08-14T19:00:00.000Z",
  },
  {
    id: "emergency_003",
    userId: "user_003",
    type: "PROFESSIONAL_HELP",
    status: "ESCALATED",
    createdAt: "2026-08-15T12:00:00.000Z",
  },
  {
    id: "emergency_004",
    userId: "user_004",
    type: "CRAVING",
    status: "OPEN",
    createdAt: "2026-08-15T13:15:00.000Z",
  },
  {
    id: "emergency_005",
    userId: "user_005",
    type: "EMOTIONAL_SUPPORT",
    status: "OPEN",
    createdAt: "2026-08-15T14:00:00.000Z",
  },
  {
    id: "emergency_006",
    userId: "user_006",
    type: "PROFESSIONAL_HELP",
    status: "ESCALATED",
    createdAt: "2026-08-15T15:30:00.000Z",
  },
  {
    id: "emergency_007",
    userId: "user_007",
    type: "PROFESSIONAL_HELP",
    status: "ESCALATED",
    createdAt: "2026-08-15T16:00:00.000Z",
  },
  {
    id: "emergency_008",
    userId: "user_002",
    type: "EMOTIONAL_SUPPORT",
    status: "CLOSED",
    closedAt: "2026-08-15T17:00:00.000Z",
    createdAt: "2026-08-15T16:30:00.000Z",
  },
  {
    id: "emergency_009",
    userId: "user_003",
    type: "CRAVING",
    status: "ACCEPTED",
    acceptedBy: "user_004",
    createdAt: "2026-08-15T17:30:00.000Z",
  },
  {
    id: "emergency_010",
    userId: "user_005",
    type: "PROFESSIONAL_HELP",
    status: "ESCALATED",
    createdAt: "2026-08-15T18:00:00.000Z",
  },
  {
    id: "emergency_011",
    userId: "user_008",
    type: "CRAVING",
    status: "CLOSED",
    closedAt: "2026-08-16T09:15:00.000Z",
    createdAt: "2026-08-16T08:45:00.000Z",
  },
  {
    id: "emergency_012",
    userId: "user_009",
    type: "EMOTIONAL_SUPPORT",
    status: "ACCEPTED",
    acceptedBy: "user_002",
    createdAt: "2026-08-16T10:30:00.000Z",
  },
  {
    id: "emergency_013",
    userId: "user_010",
    type: "PROFESSIONAL_HELP",
    status: "OPEN",
    createdAt: "2026-08-16T11:00:00.000Z",
  },
  {
    id: "emergency_014",
    userId: "user_011",
    type: "CRAVING",
    status: "CLOSED",
    acceptedBy: "user_004",
    closedAt: "2026-08-16T12:45:00.000Z",
    createdAt: "2026-08-16T12:00:00.000Z",
  },
  {
    id: "emergency_015",
    userId: "user_012",
    type: "EMOTIONAL_SUPPORT",
    status: "OPEN",
    createdAt: "2026-08-16T13:30:00.000Z",
  },
  {
    id: "emergency_016",
    userId: "user_001",
    type: "CRAVING",
    status: "CLOSED",
    acceptedBy: "user_002",
    closedAt: "2026-08-16T15:00:00.000Z",
    createdAt: "2026-08-16T14:15:00.000Z",
  },
  {
    id: "emergency_017",
    userId: "user_004",
    type: "EMOTIONAL_SUPPORT",
    status: "ACCEPTED",
    acceptedBy: "user_001",
    createdAt: "2026-08-16T16:00:00.000Z",
  },
  {
    id: "emergency_018",
    userId: "user_006",
    type: "CRAVING",
    status: "OPEN",
    createdAt: "2026-08-16T17:15:00.000Z",
  },
  {
    id: "emergency_019",
    userId: "user_007",
    type: "EMOTIONAL_SUPPORT",
    status: "CLOSED",
    acceptedBy: "user_002",
    closedAt: "2026-08-16T18:30:00.000Z",
    createdAt: "2026-08-16T17:45:00.000Z",
  },
  {
    id: "emergency_020",
    userId: "user_009",
    type: "PROFESSIONAL_HELP",
    status: "ESCALATED",
    createdAt: "2026-08-16T19:00:00.000Z",
  },
];
