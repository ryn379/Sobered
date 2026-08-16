import type { User } from "./user.mock.js";
import { findUserByUserId } from "./user.repository.js";

export const userFindService = async (userId: string): Promise<User | null> => {
  const entry = await findUserByUserId(userId);

  return entry;
};
