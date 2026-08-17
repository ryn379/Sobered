import { type EmergencyRequest } from "./emergency.mock.js";
import { type User } from "../user/user.mock.js";
import {
  acceptEmergencyRequestByReqId,
  closeEmergencyRequestByReqId,
  escalateEmergencyRequestByReqId,
  getAcceptedEmergencyByUserId,
  getAllOpenEmergencyRequests,
  getEmergencyRequestByReqId,
  postEmergencyRequestByUserId,
} from "./emergency.repository.js";
import { getFriendAllByUserId } from "../friend/friend.repository.js";
import { getMenteeByUserId } from "../sponsor/sponsor.repository.js";
import { findUserByUserId } from "../user/user.repository.js";

export const getAllEmergencyRequestService = async (
  userId: string,
): Promise<EmergencyRequest[]> => {
  const requests = await getAllOpenEmergencyRequests();

  const user = await findUserByUserId(userId);

  if (!user) {
    return [];
  }

  const friendships = await getFriendAllByUserId(userId);

  const friendIds = friendships.map((friend) =>
    friend.userId === userId ? friend.friendId : friend.userId,
  );

  const menteeIds = await getMenteeByUserId(userId);

  const isProfessional = user.role === "PROFESSIONAL";

  const visibleRequests = requests.filter((request) => {
    if (request.status === "OPEN") {
      return true;
    }
    if (request.status === "ESCALATED") {
      return menteeIds.includes(request.userId) || isProfessional;
    }
    return false;
  });
  visibleRequests.sort((a, b) => {
    const aIsProfessionalEscalation =
      isProfessional && a.status === "ESCALATED";

    const bIsProfessionalEscalation =
      isProfessional && b.status === "ESCALATED";

    if (aIsProfessionalEscalation && !bIsProfessionalEscalation) return -1;
    if (!aIsProfessionalEscalation && bIsProfessionalEscalation) return 1;

    const aIsMentee = menteeIds.includes(a.userId);
    const bIsMentee = menteeIds.includes(b.userId);

    if (aIsMentee && !bIsMentee) return -1;
    if (!aIsMentee && bIsMentee) return 1;

    const aIsFriend = friendIds.includes(a.userId);
    const bIsFriend = friendIds.includes(b.userId);

    if (aIsFriend && !bIsFriend) return -1;
    if (!aIsFriend && bIsFriend) return 1;

    return 0;
  });
  return visibleRequests;
};

export const postEmergencyRequestService = async (
  userId: string,
  type: "CRAVING" | "EMOTIONAL_SUPPORT" | "PROFESSIONAL_HELP",
): Promise<EmergencyRequest | null> => {
  const requests = await getAllOpenEmergencyRequests();

  const alreadyRequest = requests.find((e) => e.userId === userId);

  if (alreadyRequest) {
    console.log("Request of User ID already Exists");
    return null;
  }

  const request = await postEmergencyRequestByUserId(userId, type);

  return request;
};

export const acceptEmergencyRequestService = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("user does not exist");
    return null;
  }

  const request = await getEmergencyRequestByReqId(reqId);

  if (!request) {
    console.log("request does not exist");
    return null;
  }
  if (request.userId === userId) {
    console.log("User cannot accept their own request");
    return null;
  }
  const existingAccepted = await getAcceptedEmergencyByUserId(userId);

  if (existingAccepted) {
    console.log("User has already accepted one emergency");
    return null;
  }
  return await acceptEmergencyRequestByReqId(userId, reqId);
};

export const escalateEmergencyRequestService = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("user does not exist");
    return null;
  }

  const request = await getEmergencyRequestByReqId(reqId);

  if (!request) {
    console.log("request does not exist");
    return null;
  }
  if (request.status !== "OPEN") {
    console.log("Request is not OPEN");
    return null;
  }

  const isProfessional = user.role === "PROFESSIONAL";

  const menteeIds = await getMenteeByUserId(userId);
  const isSponsor = menteeIds.includes(request.userId);

  if (!isProfessional && !isSponsor) {
    return null;
  }

  return await escalateEmergencyRequestByReqId(reqId);
};

export const closeEmergencyRequestService = async (
  userId: string,
  reqId: string,
): Promise<EmergencyRequest | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Does Not Exist");
    return null;
  }

  const request = await getEmergencyRequestByReqId(reqId);

  if (!request) {
    console.log("Request Does Not Exist");
    return null;
  }

  const isAcceptedByUser = request.acceptedBy === userId;
  const isUser = request.userId === userId;

  if (!isAcceptedByUser && !isUser) {
    console.log("User is not allowed to close this request");
    return null;
  }

  const entry = await closeEmergencyRequestByReqId(reqId);

  return entry;
};
