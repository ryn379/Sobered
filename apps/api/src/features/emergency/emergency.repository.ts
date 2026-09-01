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

export const acceptEmergencyRequestByReqId = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find((e) => e.id === reqId);

  if (!request || request.status !== "OPEN") return null;

  request.status = "ACCEPTED";
  request.acceptedBy = userId;
  return request;
};

export const getAcceptedEmergencyByUserId = async (
  userId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find(
    (e) => e.acceptedBy === userId && e.status === "ACCEPTED",
  );

  return request ?? null;
};

export const getEmergencyRequestByReqId = async (
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find((e) => e.id === reqId);

  return request ?? null;
};

export const escalateEmergencyRequestByReqId = async (
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find((e) => e.id === reqId);

  if (!request) return null;

  if (request.status !== "OPEN") {
    return null;
  }
  request.status = "ESCALATED";

  return request;
};

export const closeEmergencyRequestByReqId = async (
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find((e) => e.id === reqId);

  if (request) {
    request.status = "CLOSED";
    request.closedAt = new Date().toISOString();
    return request;
  }

  return null;
};

export const getActiveEmergencyByUserId = async (
  userId: string,
): Promise<EmergencyRequest | null> => {
  const request = emergencyRequests.find(
    (e) =>
      (e.userId === userId || e.acceptedBy === userId) &&
      (e.status === "OPEN" ||
        e.status === "ACCEPTED" ||
        e.status === "ESCALATED"),
  );

  return request ?? null;
};
