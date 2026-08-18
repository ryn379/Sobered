import { getLeadersByGroupId } from "../group/group.repository.js";
import type { User } from "../user/user.mock.js";
import { findUserByUserId } from "../user/user.repository.js";
import { type Meeting, type MeetingParticipant } from "./meeting.mock.js";
import {
  addUserToMeetingByMeetId,
  endMeetingByMeetId,
  getAllMeetings,
  getMeetingByMeetId,
  getLiveMeetingByUserId,
  getMembersByMeetId,
  leaveMeetingByMeetId,
  startMeetingByMeetId,
} from "./meeting.repository.js";

export const getAllMeetingService = async (
  userId: string,
): Promise<Meeting[] | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  let meetings = await getAllMeetings();

  if (user.role === "FAMILY_MEMBER") {
    meetings = meetings.filter((e) => e.type === "FAMILY");
  } else {
    meetings = meetings.filter((e) => e.type === "RECOVERY");
  }

  return meetings;
};

export const getMeetingService = async (
  userId: string,
  meetId: string,
): Promise<Meeting | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const meet = await getMeetingByMeetId(meetId);

  if (!meet) {
    console.log("Meet Not Found");
    return null;
  }

  if (user.role === "FAMILY_MEMBER" && meet.type === "FAMILY") {
    return meet;
  }

  if (
    (user.role === "RECOVERING_USER" || user.role === "PROFESSIONAL") &&
    meet.type === "RECOVERY"
  ) {
    return meet;
  }

  console.log("User not Allowed to see meeting");
  return null;
};

export const joinMeetingService = async (
  userId: string,
  meetId: string,
): Promise<MeetingParticipant | null> => {
  const user = await findUserByUserId(userId);
  const meet = await getMeetingByMeetId(meetId);

  if (!user || !meet) {
    console.log("User or Meet Not Foudn");
    return null;
  }

  if (meet.status !== "LIVE") {
    console.log("Meeting is not live");
    return null;
  }

  const members = await getMembersByMeetId(meetId);

  const isUserInMeeting = members.some((e) => e.id === userId);

  if (isUserInMeeting) {
    console.log("User already in this meeting");
    return null;
  }

  if (
    (user.role === "RECOVERING_USER" && meet.type === "FAMILY") ||
    (user.role === "FAMILY_MEMBER" && meet.type === "RECOVERY")
  ) {
    console.log("User not allowed to join this meeting");
    return null;
  }

  const userMeeting = await getLiveMeetingByUserId(userId);

  if (userMeeting) {
    console.log("User already in other meeting");
    return null;
  }

  const participant = await addUserToMeetingByMeetId(userId, meetId);

  return participant;
};

export const leaveMeetingService = async (
  userId: string,
  meetId: string,
): Promise<User | null> => {
  const user = await findUserByUserId(userId);
  const meet = await getMeetingByMeetId(meetId);

  if (!user || !meet) {
    console.log("User or Meet Not Found");
    return null;
  }

  const members = await getMembersByMeetId(meetId);

  const isUserInMeeting = members.find((e) => e.id === userId);

  if (!isUserInMeeting) {
    console.log("User is not in this meeting");
    return null;
  }

  await leaveMeetingByMeetId(userId, meetId);

  return user;
};

export const getMembersMeetingService = async (
  userId: string,
  meetId: string,
): Promise<User[] | null> => {
  const user = await findUserByUserId(userId);
  const meet = await getMeetingByMeetId(meetId);

  if (!user || !meet) {
    console.log("User or Meet Not Found");
    return null;
  }

  if (meet.status !== "LIVE") {
    console.log("Meeting is not live");
    return null;
  }

  const members = await getMembersByMeetId(meetId);

  if (user.role === "FAMILY_MEMBER" && meet.type === "FAMILY") {
    return members;
  } else if (
    (user.role === "RECOVERING_USER" || user.role === "PROFESSIONAL") &&
    meet.type === "RECOVERY"
  ) {
    return members;
  }

  console.log("Not allowed to see members");
  return null;
};

export const startMeetingService = async (
  userId: string,
  meetId: string,
): Promise<Meeting | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const meeting = await getMeetingByMeetId(meetId);

  if (!meeting) {
    console.log("Meeting Not Found");
    return null;
  }

  const leaders = await getLeadersByGroupId(meeting.groupId);

  const isLeader = leaders.some((e) => e.groupMember.userId === userId);

  if (!isLeader) {
    console.log("User is not a leader of this group");
    return null;
  }

  if (meeting.status !== "SCHEDULED") {
    console.log("Meeting is not scheduled");
    return null;
  }

  return await startMeetingByMeetId(meetId);
};

export const endMeetingService = async (
  userId: string,
  meetId: string,
): Promise<Meeting | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const meeting = await getMeetingByMeetId(meetId);

  if (!meeting) {
    console.log("Meeting Not Found");
    return null;
  }

  const leaders = await getLeadersByGroupId(meeting.groupId);

  const isLeader = leaders.some((e) => e.groupMember.userId === userId);

  if (!isLeader) {
    console.log("User is not a leader of this group");
    return null;
  }

  if (meeting.status !== "LIVE") {
    console.log("Meeting is not live");
    return null;
  }

  return await endMeetingByMeetId(meetId);
};
