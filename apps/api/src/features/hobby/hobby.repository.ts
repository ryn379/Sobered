import {
  hobbies,
  predefinedHobbies,
  type Hobby,
  type PredefinedHobby,
} from "./hobby.mock.js";

export const getAllPredefinedHobbies = async (): Promise<PredefinedHobby[]> => {
  return predefinedHobbies;
};

export const getHobbyByHobbyId = async (
  hobbyId: string,
): Promise<PredefinedHobby | null> => {
  const hobby = predefinedHobbies.find((e) => e.id === hobbyId);

  return hobby ?? null;
};

export const getHobbiesByUserId = async (userId: string): Promise<Hobby[]> => {
  const userHobbies = hobbies.filter((e) => e.userId === userId);

  return userHobbies;
};

export const createHobbyByUserId = async (
  userId: string,
  hobbyId: string,
  goal: string,
): Promise<Hobby> => {
  const hobby = await getHobbyByHobbyId(hobbyId);

  const userHobby = {
    id: `hobby_${String(hobbies.length + 1).padStart(3, "0")}`,
    userId,
    hobbyId,
    name: hobby!.name,
    description: hobby!.description,
    goal,
    progress: 0,
    currentStreak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    offset: 1,
  };

  hobbies.push(userHobby);

  return userHobby;
};

export const updateHobbyByUserId = async (
  userId: string,
  hobbyId: string,
  goal: string,
  description: string,
): Promise<Hobby | null> => {
  const hobby = hobbies.find((e) => e.userId === userId && e.id === hobbyId);

  if (!hobby) {
    return null;
  }

  hobby.goal = goal;
  hobby.description = description;
  hobby.updatedAt = new Date().toISOString();

  return hobby;
};
