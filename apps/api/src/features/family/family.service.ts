import { type User } from "../user/user.mock.js";
import {
  getFamilyByUserId,
  getRecovererByFamilyUserId,
} from "./family.repository.js";
import type { SobrietyStats } from "../sobriety/sobriety.mock.js";
import { findUserByUserId } from "../user/user.repository.js";
import { statsSobrietyService } from "../sobriety/sobriety.service.js";

export const getFamilyService = async (
  userId: string,
): Promise<User[] | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User does Not exist");
    return null;
  }

  if (user.role !== "RECOVERING_USER") {
    console.log("User is a Family Member requesting family");
    return null;
  }
  const family = await getFamilyByUserId(userId);

  return family;
};

export const SobrietyFamilyService = async (
  userId: string,
  recovererId: string,
): Promise<SobrietyStats | null> => {
  const familyUser = await findUserByUserId(userId);
  const recoverer = await findUserByUserId(recovererId);

  if (!familyUser || !recoverer) {
    console.log("User or Recoverer does Not exist");
    return null;
  }

  const family = await getFamilyByUserId(recovererId);

  const isFamily = family.some((e) => e.id === userId);

  if (!isFamily) {
    console.log("Not The User's Family");
    return null;
  }

  const sobriety = await statsSobrietyService(recovererId);

  return sobriety;
};

export const getRecovererFromFamilyService = async (
  userId: string,
): Promise<User[] | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User does Not exist");
    return null;
  }

  if (user.role !== "FAMILY_MEMBER") {
    console.log("User is a Recoverer requesting Recoverer");
    return null;
  }
  const recoverer = await getRecovererByFamilyUserId(userId);

  return recoverer;
};
