import { findUserByUserId } from "../user/user.repository.js";
import { type Hobby, type PredefinedHobby } from "./hobby.mock.js";
import {
  createHobby,
  createHobbyProgress,
  deleteHobby,
  getAllPredefinedHobbies,
  getHobbiesByUserId,
  getHobbyById,
  getHobbyProgressHistory,
  getPredefinedHobbyById,
  updateHobby,
  updateHobbyProgress,
} from "./hobby.repository.js";

export const getHobbyTypesService = async (): Promise<PredefinedHobby[]> => {
  return getAllPredefinedHobbies();
};

export const getHobbyTypeService = async (
  hobbyTypeId: string,
): Promise<PredefinedHobby | null> => {
  const hobbyType = await getPredefinedHobbyById(hobbyTypeId);

  if (!hobbyType) {
    console.log("Hobby Not Found");
    return null;
  }

  return hobbyType;
};

export const getUserHobbiesService = async (
  userId: string,
): Promise<Hobby[] | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  return getHobbiesByUserId(userId);
};

export const getUserHobbyService = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const hobby = await getHobbyById(userId, hobbyId);

  if (!hobby) {
    console.log("Hobby Not Found");
    return null;
  }

  return hobby;
};

export const getHobbyProgressService = async (
  userId: string,
  hobbyId: string,
): Promise<number | null> => {
  const hobby = await getHobbyById(userId, hobbyId);

  if (!hobby) {
    console.log("Hobby Not Found");
    return null;
  }

  return hobby.progress;
};

export const createHobbyService = async (
  userId: string,
  hobbyTypeId: string,
  goal: string,
): Promise<Hobby | null> => {
  const user = await findUserByUserId(userId);

  if (!user) {
    console.log("User Not Found");
    return null;
  }

  const hobbyType = await getPredefinedHobbyById(hobbyTypeId);

  if (!hobbyType) {
    console.log("Hobby Not Found");
    return null;
  }

  return createHobby(userId, hobbyType, goal);
};

export const updateHobbyService = async (
  userId: string,
  hobbyId: string,
  goal: string,
  description: string,
): Promise<Hobby | null> => {
  const existingHobby = await getHobbyById(userId, hobbyId);

  if (!existingHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  const updatedHobby = await updateHobby(userId, hobbyId, goal, description);

  if (!updatedHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  return updatedHobby;
};

export const updateHobbyProgressService = async (
  userId: string,
  hobbyId: string,
  progress: number,
  note: string,
): Promise<Hobby | null> => {
  if (progress < 0 || progress > 100) {
    console.log("Progress Must Be Between 0 And 100");
    return null;
  }

  const existingHobby = await getHobbyById(userId, hobbyId);

  if (!existingHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  const updatedHobby = await updateHobbyProgress(userId, hobbyId, progress);

  if (!updatedHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  await createHobbyProgress(hobbyId, progress, note);

  return updatedHobby;
};

export const deleteHobbyService = async (
  userId: string,
  hobbyId: string,
): Promise<Hobby | null> => {
  const existingHobby = await getHobbyById(userId, hobbyId);

  if (!existingHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  const deletedHobby = await deleteHobby(userId, hobbyId);

  if (!deletedHobby) {
    console.log("Hobby Not Found");
    return null;
  }

  return deletedHobby;
};

export const getAnalysisHobbyService = async (
  userId: string,
  hobbyId: string,
) => {
  const hobby = await getHobbyById(userId, hobbyId);

  if (!hobby) {
    console.log("Hobby Not Found");
    return null;
  }

  const history = await getHobbyProgressHistory(hobbyId);

  if (history.length === 0) {
    return {
      hobbyId: hobby.id,
      currentProgress: hobby.progress,
      currentStreak: hobby.currentStreak,
      trend: "NO_DATA",
      improvement: 0,
      averageProgressChange: 0,
      consistency: 0,
      status: "NOT_STARTED",
      history: [],
    };
  }

  const firstProgress = history[0]!.progress;
  const latestProgress = history[history.length - 1]!.progress;
  const improvement = latestProgress - firstProgress;

  let totalChange = 0;

  for (let i = 1; i < history.length; i++) {
    totalChange += history[i]!.progress - history[i - 1]!.progress;
  }

  const averageProgressChange =
    history.length > 1 ? totalChange / (history.length - 1) : 0;

  let trend: "IMPROVING" | "DECLINING" | "STABLE" | "NO_DATA";

  if (improvement > 0) {
    trend = "IMPROVING";
  } else if (improvement < 0) {
    trend = "DECLINING";
  } else {
    trend = "STABLE";
  }

  let status: "NOT_STARTED" | "IN_PROGRESS" | "NEAR_COMPLETION" | "COMPLETED";

  if (latestProgress === 0) {
    status = "NOT_STARTED";
  } else if (latestProgress >= 100) {
    status = "COMPLETED";
  } else if (latestProgress >= 75) {
    status = "NEAR_COMPLETION";
  } else {
    status = "IN_PROGRESS";
  }

  return {
    hobbyId: hobby.id,
    goal: hobby.goal,
    currentProgress: hobby.progress,
    currentStreak: hobby.currentStreak,
    trend,
    improvement,
    averageProgressChange: Number(averageProgressChange.toFixed(2)),
    status,
    history,
  };
};
