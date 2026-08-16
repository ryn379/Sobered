import { type User, users } from "./user.mock.js";

export const findUserByUserId = async (
  userId: string,
): Promise<User | null> => {
  const user = users.find((e) => e.id === userId);

  return user ?? null;
};
