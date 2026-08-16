import { type EmergencyRequest } from "./emergency.mock.js";
import { type User } from "../user/user.mock.js";
import {
  getAllOpenEmergencyRequests,
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
): Promise<EmergencyRequest> => {
  const request = await postEmergencyRequestByUserId(userId, type);

  return request;
};
