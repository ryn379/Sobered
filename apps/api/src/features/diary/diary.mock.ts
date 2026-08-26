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
  {
    id: "diary_004",
    userId: "user_002",
    title: "Small victory",
    content:
      "I finished my morning routine and went for a run. Keeping busy helped me stay focused.",
    mood: "proud",
    createdAt: "2026-08-13T08:30:00.000Z",
    updatedAt: "2026-08-13T08:30:00.000Z",
  },
  {
    id: "diary_005",
    userId: "user_003",
    title: "Trying to understand",
    content:
      "I spent some time learning how to be supportive without trying to solve everything for someone else.",
    mood: "thoughtful",
    createdAt: "2026-08-05T20:00:00.000Z",
    updatedAt: "2026-08-05T20:00:00.000Z",
  },
  {
    id: "diary_006",
    userId: "user_003",
    title: "A quiet evening",
    content:
      "Tonight felt calmer. I focused on listening and giving space instead of worrying about things I cannot control.",
    mood: "calm",
    createdAt: "2026-08-09T19:15:00.000Z",
    updatedAt: "2026-08-09T19:15:00.000Z",
  },
  {
    id: "diary_007",
    userId: "user_004",
    title: "Keeping the streak",
    content:
      "Another day completed. I practiced chess for an hour and stayed away from situations that usually trigger me.",
    mood: "motivated",
    createdAt: "2026-08-11T21:00:00.000Z",
    updatedAt: "2026-08-11T21:00:00.000Z",
  },
  {
    id: "diary_008",
    userId: "user_004",
    title: "Hard conversation",
    content:
      "I had a difficult conversation today, but I am glad I did not avoid it. Being honest felt uncomfortable but necessary.",
    mood: "relieved",
    createdAt: "2026-08-13T20:30:00.000Z",
    updatedAt: "2026-08-13T20:30:00.000Z",
  },
  {
    id: "diary_009",
    userId: "user_005",
    title: "Feeling disconnected",
    content:
      "I felt disconnected from everyone today. I reached out to someone instead of keeping everything to myself.",
    mood: "lonely",
    createdAt: "2026-08-10T18:00:00.000Z",
    updatedAt: "2026-08-10T18:00:00.000Z",
  },
  {
    id: "diary_010",
    userId: "user_005",
    title: "Something to look forward to",
    content:
      "I planned a few things for the weekend and realized I actually have things I am looking forward to.",
    mood: "hopeful",
    createdAt: "2026-08-14T17:45:00.000Z",
    updatedAt: "2026-08-14T17:45:00.000Z",
  },
  {
    id: "diary_011",
    userId: "user_006",
    title: "Supporting someone",
    content:
      "Today reminded me that being present can sometimes be more useful than having the perfect advice.",
    mood: "grateful",
    createdAt: "2026-08-08T16:30:00.000Z",
    updatedAt: "2026-08-08T16:30:00.000Z",
  },
  {
    id: "diary_012",
    userId: "user_006",
    title: "Learning patience",
    content:
      "I wanted to fix everything immediately, but I reminded myself that recovery takes time and patience.",
    mood: "patient",
    createdAt: "2026-08-12T19:30:00.000Z",
    updatedAt: "2026-08-12T19:30:00.000Z",
  },
  {
    id: "diary_013",
    userId: "user_007",
    title: "A challenging morning",
    content:
      "The morning started badly, but I managed to slow down, eat something, and get outside for a while.",
    mood: "stressed",
    createdAt: "2026-08-13T11:00:00.000Z",
    updatedAt: "2026-08-13T11:00:00.000Z",
  },
  {
    id: "diary_014",
    userId: "user_007",
    title: "Progress is progress",
    content:
      "I am starting to notice small changes in my routine. They do not feel huge, but they are still changes.",
    mood: "encouraged",
    createdAt: "2026-08-15T20:15:00.000Z",
    updatedAt: "2026-08-15T20:15:00.000Z",
  },
  {
    id: "diary_015",
    userId: "user_008",
    title: "Back to routine",
    content:
      "Getting back into a consistent routine made the day feel much easier. I want to keep this going.",
    mood: "focused",
    createdAt: "2026-08-14T18:45:00.000Z",
    updatedAt: "2026-08-14T18:45:00.000Z",
  },
  {
    id: "diary_016",
    userId: "user_009",
    title: "Grateful today",
    content:
      "I spent some time thinking about the people who have supported me. I do not say thank you often enough.",
    mood: "grateful",
    createdAt: "2026-08-11T19:00:00.000Z",
    updatedAt: "2026-08-11T19:00:00.000Z",
  },
  {
    id: "diary_017",
    userId: "user_010",
    title: "One step at a time",
    content:
      "I was worried about everything happening at once, so I focused only on what I could handle today.",
    mood: "calm",
    createdAt: "2026-08-12T21:15:00.000Z",
    updatedAt: "2026-08-12T21:15:00.000Z",
  },
  {
    id: "diary_018",
    userId: "user_011",
    title: "Unexpected good day",
    content:
      "Today was easier than I expected. Nothing major happened, but I felt comfortable with where I was.",
    mood: "happy",
    createdAt: "2026-08-15T18:30:00.000Z",
    updatedAt: "2026-08-15T18:30:00.000Z",
  },
  {
    id: "diary_019",
    userId: "user_012",
    title: "Taking a break",
    content:
      "I realized I had been pushing myself too hard. Taking an evening to rest helped me reset.",
    mood: "relaxed",
    createdAt: "2026-08-15T20:00:00.000Z",
    updatedAt: "2026-08-15T20:00:00.000Z",
  },
  {
    id: "diary_020",
    userId: "user_001",
    title: "Looking back",
    content:
      "I looked back at my earlier entries today. Some things are still difficult, but I can see that I have made progress.",
    mood: "proud",
    createdAt: "2026-08-16T20:30:00.000Z",
    updatedAt: "2026-08-16T20:30:00.000Z",
  },
];
