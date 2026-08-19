import {
  hobbies,
  hobbyProgress,
  predefinedHobbies,
  type Hobby,
  type HobbyProgress,
  type PredefinedHobby,
} from "./hobby.mock.js";

export const getAllPredefinedHobbies = async (): Promise<PredefinedHobby[]> => {
  return predefinedHobbies;
};

export const getPredefinedHobbyById = async (
  hobbyTypeId: string,
): Promise<PredefinedHobby | null> => {
  return predefinedHobbies.find((h) => h.id === hobbyTypeId) ?? null;
};

export const getHobbiesByUserId = async (userId: string): Promise<Hobby[]> => {
  return hobbies.filter((h) => h.userId === userId);
};

export const getHobbyById = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby | null> => {
  return hobbies.find((h) => h.userId === userId && h.id === hobbyId) ?? null;
};

export const createHobby = async (
  userId: string,
  predefinedHobby: PredefinedHobby,
  goal: string,
): Promise<Hobby> => {
  const newHobby: Hobby = {
    id: `hobby_${String(hobbies.length + 1).padStart(3, "0")}`,
    userId,
    hobbyTypeId: predefinedHobby.id,
    name: predefinedHobby.name,
    description: predefinedHobby.description,
    goal,
    progress: 0,
    currentStreak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  hobbies.push(newHobby);

  return newHobby;
};

export const updateHobby = async (
  userId: string,
  hobbyId: string,
  goal: string,
  description: string,
): Promise<Hobby | null> => {
  const hobby = hobbies.find((h) => h.userId === userId && h.id === hobbyId);

  if (!hobby) {
    return null;
  }

  hobby.goal = goal;
  hobby.description = description;
  hobby.updatedAt = new Date().toISOString();

  return hobby;
};

export const updateHobbyProgress = async (
  userId: string,
  hobbyId: string,
  progress: number,
): Promise<Hobby | null> => {
  const hobby = hobbies.find((h) => h.userId === userId && h.id === hobbyId);

  if (!hobby) {
    return null;
  }

  hobby.progress = progress;
  hobby.updatedAt = new Date().toISOString();

  return hobby;
};

export const deleteHobby = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby | null> => {
  const index = hobbies.findIndex(
    (h) => h.userId === userId && h.id === hobbyId,
  );

  if (index === -1) {
    return null;
  }

  const [deletedHobby] = hobbies.splice(index, 1);

  return deletedHobby ?? null;
};

export const getHobbyProgressHistory = async (
  hobbyId: string,
): Promise<HobbyProgress[]> => {
  return hobbyProgress
    .filter((e) => e.hobbyId === hobbyId)
    .sort(
      (a, b) =>
        new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime(),
    );
};

export const createHobbyProgress = async (
  hobbyId: string,
  progress: number,
  note: string,
): Promise<HobbyProgress> => {
  const newProgress: HobbyProgress = {
    id: `progress_${String(hobbyProgress.length + 1).padStart(3, "0")}`,
    hobbyId,
    progress,
    note,
    recordedAt: new Date().toISOString(),
  };

  hobbyProgress.push(newProgress);

  return newProgress;
};
