import { type EmergencyRequest, emergencyRequests } from "./emergency.mock.js";

export const getAllOpenEmergencyRequests = async (): Promise<
  EmergencyRequest[]
> => {
  const entries = emergencyRequests.filter(
    (e) => e.status === "OPEN" || e.status === "ESCALATED",
  );
  return entries;
};

export const postEmergencyRequestByUserId = async (
  userId: string,
  type: "CRAVING" | "EMOTIONAL_SUPPORT" | "PROFESSIONAL_HELP",
): Promise<EmergencyRequest> => {
  const emergency: EmergencyRequest = {
    id: `emergency_${String(emergencyRequests.length + 1).padStart(3, "0")}`,
    userId,
    type,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  };
  emergencyRequests.push(emergency);
  return emergency;
};
