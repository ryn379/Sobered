import { users, type User } from "../user/user.mock.js";
import {
  type Meeting,
  type MeetingParticipant,
  meetings,
  meetingParticipants,
} from "./meeting.mock.js";

export const getAllMeetings = async (): Promise<Meeting[]> => {
  return meetings;
};

export const getMeetingByMeetId = async (
  meetId: string,
): Promise<Meeting | null> => {
  const meet = meetings.find((e) => e.id === meetId);

  return meet ?? null;
};

export const getMembersByMeetId = async (meetId: string): Promise<User[]> => {
  const members = meetingParticipants
    .filter((e) => e.meetingId === meetId)
    .map((f) => {
      return users.find((g) => g.id === f.userId);
    })
    .filter((user): user is User => user !== undefined);

  return members;
};

export const addUserToMeetingByMeetId = async (
  userId: string,
  meetId: string,
): Promise<MeetingParticipant> => {
  const participant: MeetingParticipant = {
    meetingId: meetId,
    userId: userId,
    joinedAt: new Date().toISOString(),
  };

  meetingParticipants.push(participant);

  return participant;
};

export const getLiveMeetingByUserId = async (
  userId: string,
): Promise<Meeting | null> => {
  const meeting = meetingParticipants
    .filter((e) => e.userId === userId)
    .map((e) => meetings.find((f) => f.id === e.meetingId))
    .find((e) => e?.status === "LIVE");

  return meeting ?? null;
};

export const leaveMeetingByMeetId = async (
  userId: string,
  meetId: string,
): Promise<void> => {
  const idx = meetingParticipants.findIndex(
    (e) => e.meetingId === meetId && e.userId === userId,
  );

  if (idx === -1) {
    console.log("Index Does Not Exist");
    return;
  }

  meetingParticipants.splice(idx, 1);
};

export const startMeetingByMeetId = async (
  meetId: string,
): Promise<Meeting | null> => {
  const meeting = meetings.find((e) => e.id === meetId);

  if (!meeting) {
    return null;
  }

  if (meeting.status !== "SCHEDULED") {
    return null;
  }

  meeting.status = "LIVE";

  return meeting;
};

export const endMeetingByMeetId = async (
  meetId: string,
): Promise<Meeting | null> => {
  const meeting = meetings.find((e) => e.id === meetId);

  if (!meeting) {
    return null;
  }

  if (meeting.status !== "LIVE") {
    return null;
  }

  meeting.status = "ENDED";

  return meeting;
};
