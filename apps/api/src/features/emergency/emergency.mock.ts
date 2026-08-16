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
];
