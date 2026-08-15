export interface DiaryEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood?: string;
  createdAt: string;
  updatedAt: string;
}

export const diaryEntries: DiaryEntry[] = [
  {
    id: "diary_001",
    userId: "user_001",
    title: "First difficult week",
    content:
      "This week was difficult, but I managed to attend two meetings and talk to my sponsor.",
    mood: "anxious",
    createdAt: "2026-07-10T18:30:00.000Z",
    updatedAt: "2026-07-10T18:30:00.000Z",
  },
  {
    id: "diary_002",
    userId: "user_001",
    title: "A better day",
    content:
      "I went for a walk instead of drinking. It helped more than I expected.",
    mood: "hopeful",
    createdAt: "2026-07-12T19:00:00.000Z",
    updatedAt: "2026-07-12T19:00:00.000Z",
  },
  {
    id: "diary_003",
    userId: "user_002",
    title: "Craving today",
    content:
      "I had a strong craving this afternoon. I used HALT and realized I was mostly lonely.",
    mood: "overwhelmed",
    createdAt: "2026-08-12T15:00:00.000Z",
    updatedAt: "2026-08-12T15:00:00.000Z",
  },
];
