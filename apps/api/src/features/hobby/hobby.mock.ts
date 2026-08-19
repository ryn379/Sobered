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

export const predefinedHobbies: PredefinedHobby[] = [
  {
    id: "hobby_type_001",
    name: "Programming",
    description: "Learning programming and building software projects.",
  },
  {
    id: "hobby_type_002",
    name: "Reading",
    description: "Reading books, articles, and other written material.",
  },
  {
    id: "hobby_type_003",
    name: "Writing",
    description: "Writing stories, journals, articles, or other creative work.",
  },
  {
    id: "hobby_type_004",
    name: "Running",
    description: "Running regularly to improve fitness and endurance.",
  },
  {
    id: "hobby_type_005",
    name: "Cycling",
    description: "Cycling for exercise, recreation, or transportation.",
  },
  {
    id: "hobby_type_006",
    name: "Cooking",
    description: "Learning recipes and preparing meals.",
  },
  {
    id: "hobby_type_007",
    name: "Gardening",
    description: "Growing plants, flowers, vegetables, or herbs.",
  },
  {
    id: "hobby_type_008",
    name: "Photography",
    description: "Taking and improving photographs.",
  },
  {
    id: "hobby_type_009",
    name: "Drawing",
    description: "Practicing drawing, sketching, and illustration.",
  },
  {
    id: "hobby_type_010",
    name: "Painting",
    description: "Creating artwork using paint and different techniques.",
  },
  {
    id: "hobby_type_011",
    name: "Music",
    description: "Playing, learning, or practicing music.",
  },
  {
    id: "hobby_type_012",
    name: "Chess",
    description: "Playing chess and improving strategic thinking.",
  },
  {
    id: "hobby_type_013",
    name: "Gaming",
    description: "Playing video games or other recreational games.",
  },
  {
    id: "hobby_type_014",
    name: "Meditation",
    description: "Practicing meditation and mindfulness.",
  },
  {
    id: "hobby_type_015",
    name: "Exercise",
    description: "Participating in physical exercise and fitness activities.",
  },
];

export const hobbies: Hobby[] = [
  {
    id: "hobby_001",
    userId: "user_001",
    hobbyTypeId: "hobby_type_001",
    name: "Programming",
    description: "Learning programming and building software projects.",
    goal: "Build my first full-stack application.",
    progress: 35,
    currentStreak: 5,
    createdAt: "2026-07-20T10:00:00.000Z",
    updatedAt: "2026-08-14T20:00:00.000Z",
  },
  {
    id: "hobby_002",
    userId: "user_002",
    hobbyTypeId: "hobby_type_004",
    name: "Running",
    description: "Running regularly to improve fitness and endurance.",
    goal: "Run 100 km this month.",
    progress: 62,
    currentStreak: 8,
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-08-14T18:00:00.000Z",
  },
  {
    id: "hobby_003",
    userId: "user_004",
    hobbyTypeId: "hobby_type_012",
    name: "Chess",
    description: "Playing chess and improving strategic thinking.",
    goal: "Reach a 1200 rating.",
    progress: 40,
    currentStreak: 8,
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-08-14T18:00:00.000Z",
  },
];

export const hobbyProgress: HobbyProgress[] = [
  {
    id: "progress_001",
    hobbyId: "hobby_001",
    progress: 10,
    note: "Started learning TypeScript.",
    recordedAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "progress_002",
    hobbyId: "hobby_001",
    progress: 20,
    note: "Built my first Express API.",
    recordedAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "progress_003",
    hobbyId: "hobby_001",
    progress: 35,
    note: "Finished authentication.",
    recordedAt: "2026-08-14T10:00:00.000Z",
  },
];
