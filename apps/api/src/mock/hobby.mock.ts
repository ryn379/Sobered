export interface Hobby {
  id: string;
  userId: string;
  name: string;
  description: string;
  goal: string;
  progress: number;
  currentStreak: number;
  createdAt: string;
  updatedAt: string;
}

export const hobbies: Hobby[] = [
  {
    id: "hobby_001",
    userId: "user_001",
    name: "Programming",
    description: "Learning web development and building small projects.",
    goal: "Build my first full-stack application.",
    progress: 35,
    currentStreak: 5,
    createdAt: "2026-07-20T10:00:00.000Z",
    updatedAt: "2026-08-14T20:00:00.000Z",
  },
  {
    id: "hobby_002",
    userId: "user_002",
    name: "Running",
    description: "Running regularly to replace unhealthy habits with exercise.",
    goal: "Run 100 km this month.",
    progress: 62,
    currentStreak: 8,
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-08-14T18:00:00.000Z",
  },
];
