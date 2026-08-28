import { users, type User } from "../user/user.mock.js";
import { families } from "./family.mock.js";

export const getFamilyByUserId = async (userId: string): Promise<User[]> => {
  const family = families
    .filter((e) => e.recoveringUserId === userId && e.status === "CONNECTED")
    .map((e) => users.find((user) => user.id === e.familyUserId))
    .filter((user): user is User => user !== undefined);

  return family;
};

export const getRecovererByFamilyUserId = async (
  userId: string,
): Promise<User[]> => {
  const recoverers = families
    .filter((e) => e.familyUserId === userId && e.status === "CONNECTED")
    .map((e) => users.find((user) => user.id === e.recoveringUserId))
    .filter((user): user is User => user !== undefined);

  return recoverers;
};
