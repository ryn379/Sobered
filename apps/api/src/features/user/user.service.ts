import type { User } from "./user.mock.js";
import { findUserByUserId } from "./user.repository.js";
import { getSponsorByUserId } from "../sponsor/sponsor.repository.js";
import type { Sponsor } from "../sponsor/sponsor.mock.js";

export const userFindService = async (
  userId: string,
): Promise<{ user: User; sponsor: User | null } | null> => {
  const entry = await findUserByUserId(userId);

  if (!entry) return null;

  const sponsor = await getSponsorByUserId(userId);

  return {
    user: entry,
    sponsor,
  };
};
