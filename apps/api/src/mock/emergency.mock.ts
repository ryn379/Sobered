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
];
