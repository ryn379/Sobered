import { users, type User } from "../user/user.mock.js";
import { findUserByUserId } from "../user/user.repository.js";
import { type Family, families } from "./family.mock.js";

export const getFamilyByUserId = async (userId: string): Promise<User[]> => {
  const family = families
    .filter((e) => e.recoveringUserId === userId)
    .map((f) => {
      return users.find((g) => g.id === f.familyUserId);
    })
    .filter((user): user is User => user !== undefined);

  return family;
};

export const getRecovererByFamilyUserId = async (
  userId: string,
): Promise<User[]> => {
  const recoverers = families
    .filter((e) => e.familyUserId === userId)
    .map((f) => {
      return users.find((g) => g.id === f.recoveringUserId);
    })
    .filter((user): user is User => user !== undefined);

  return recoverers;
};
