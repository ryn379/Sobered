import { findUserByUserId } from "../user/user.repository.js";
import type { Hobby, PredefinedHobby, UpdateHobby } from "./hobby.mock.js";
import {
  createHobbyByUserId,
  getAllPredefinedHobbies,
  getHobbiesByUserId,
  getHobbyByHobbyId,
  updateHobbyByUserId,
} from "./hobby.repository.js";

export const getTypesHobbyService = async (): Promise<PredefinedHobby[]> => {
  const hobbies = await getAllPredefinedHobbies();

  return hobbies;
};

export const getTypeHobbyService = async (
  hobbyId: string,
): Promise<PredefinedHobby | null> => {
  const hobby = await getHobbyByHobbyId(hobbyId);

  return hobby;
};

export const getHobbiesService = async (
  userId: string,
): Promise<Hobby[] | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
  }

  const hobbies = await getHobbiesByUserId(userId);

  return hobbies;
};

export const getUserHobbyService = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby | null> => {
  const user = await findUserByUserId(userId);
  const hobby = await getHobbyByHobbyId(hobbyId);

  if (!user || !hobby) {
    console.log("User or Hobby Not Found");
    return null;
  }

  const userHobbies = await getHobbiesByUserId(userId);

  const userHobby = userHobbies.find((e) => e.hobbyId === hobbyId);

  return userHobby ?? null;
};

export const createHobbyService = async (
  userId: string,
  hobbyId: string,
  goal: string,
): Promise<Hobby | null> => {
  const user = await findUserByUserId(userId);
  const hobby = await getHobbyByHobbyId(hobbyId);

  if (!user || !hobby) {
    console.log("User of Hobby NF");
    return null;
  }

  const userHobby = await createHobbyByUserId(userId, hobbyId, goal);

  return userHobby;
};

export const updateHobbyService = async (
  userId: string,
  hobbyId: string,
  goal: string,
  description: string,
): Promise<Hobby | null> => {
  const user = await findUserByUserId(userId);

  const hobbies = await getHobbiesByUserId(userId);

  const hobby = hobbies.find((e) => e.id === hobbyId);

  if (!user || !hobby) {
    console.log("User or Hobby Not Found");
    return null;
  }

  const updatedHobby = await updateHobbyByUserId(
    userId,
    hobbyId,
    goal,
    description,
  );

  return updatedHobby;
};
