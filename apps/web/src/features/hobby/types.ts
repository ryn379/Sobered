export interface PredefinedHobby {
  id: string;
  name: string;
  description: string;
}

export interface HobbyProgress {
  id: string;
  hobbyId: string;
  progress: number;
  note: string;
  recordedAt: string;
}

export interface Hobby {
  id: string;
  userId: string;
  hobbyTypeId: string;
  name: string;
  description: string;
  goal: string;
  progress: number;
  currentStreak: number;
  createdAt: string;
  updatedAt: string;
}

export interface GoalAnalysis {
  hobbyId: string;
  goal: string;
  currentProgress: number;
  currentStreak: number;
  trend: "IMPROVING" | "DECLINING" | "STABLE" | "NO_DATA";
  improvement: number;
  averageProgressChange: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "NEAR_COMPLETION" | "COMPLETED";
  history: HobbyProgress[];
}

export interface NoGoalAnalysis {
  hobbyId: string;
  currentProgress: number;
  currentStreak: number;
  trend: "IMPROVING" | "DECLINING" | "STABLE" | "NO_DATA";
  improvement: number;
  averageProgressChange: number;
  consistency: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "NEAR_COMPLETION" | "COMPLETED";
  history: HobbyProgress[];
}

export type Analysis = GoalAnalysis | NoGoalAnalysis | null;
