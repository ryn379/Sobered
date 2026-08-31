import { describe, it, expect, vi, beforeEach } from "vitest";

import { findUserByUserId } from "../../src/features/user/user.repository.ts";
import {
  deleteDiaryEntryByDiaryId,
  findDiaryEntryByDiaryId,
  findDiaryEntryByUserId,
  postDiaryEntry,
  updateDiaryEntryByDiaryId,
} from "../../src/features/diary/diary.repository.ts";
import type { User } from "../../src/features/user/user.mock.ts";
import {
  deleteDiaryService,
  getDiaryEntriesService,
  getDiaryEntryService,
  postDiaryService,
  updateDiaryService,
} from "../../src/features/diary/diary.service.ts";
import { DiaryEntry } from "../../src/features/diary/diary.mock.ts";

vi.mock("../../src/features/user/user.repository.ts");
vi.mock("../../src/features/diary/diary.repository.ts");

beforeEach(() => {
  vi.resetAllMocks();
});

const user: User = {
  id: "user_001",
  username: "alex_recovery",
  email: "alex@example.com",
  role: "RECOVERING_USER",
  createdAt: "2026-07-01T10:00:00.000Z",
};

const entry: DiaryEntry = {
  id: "diary_001",
  userId: "user_001",
  title: "First difficult week",
  content:
    "This week was difficult, but I managed to attend two meetings and talk to my sponsor.",
  mood: "anxious",
  createdAt: "2026-07-10T18:30:00.000Z",
  updatedAt: "2026-07-10T18:30:00.000Z",
};

const User2entry: DiaryEntry = {
  id: "diary_003",
  userId: "user_002",
  title: "Craving today",
  content:
    "I had a strong craving this afternoon. I used HALT and realized I was mostly lonely.",
  mood: "overwhelmed",
  createdAt: "2026-08-12T15:00:00.000Z",
  updatedAt: "2026-08-12T15:00:00.000Z",
};

describe("getDiaryEntriesService", () => {
  it("returns all diary entries", async () => {
    const diaryResult = [
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

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByUserId).mockResolvedValueOnce(diaryResult);

    const result = await getDiaryEntriesService("user_001");

    expect(result).toEqual(diaryResult);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if user not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getDiaryEntriesService("user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByUserId).not.toHaveBeenCalled();
  });
});

describe("getDiaryEntryService", () => {
  it("returns DiaryEntry by id", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(entry);

    const result = await getDiaryEntryService("user_001", "diary_001");

    expect(result).toEqual(entry);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_001");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getDiaryEntryService("user", "diary_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
  });

  it("diary entry does not belong to user", async () => {
    const User2entry: DiaryEntry = {
      id: "diary_003",
      userId: "user_002",
      title: "Craving today",
      content:
        "I had a strong craving this afternoon. I used HALT and realized I was mostly lonely.",
      mood: "overwhelmed",
      createdAt: "2026-08-12T15:00:00.000Z",
      updatedAt: "2026-08-12T15:00:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(User2entry);

    const result = await getDiaryEntryService("user_001", "diary_003");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_003");
  });
});

describe("updateDiaryService", () => {
  const updatedEntry: DiaryEntry = {
    id: "diary_001",
    userId: "user_001",
    title: "First difficult week",
    content: "say hello to my little friend",
    mood: "anxious",
    createdAt: "2026-07-10T18:30:00.000Z",
    updatedAt: expect.any(String),
  };

  it("updates diary and returns DiaryEntry", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(entry);
    vi.mocked(updateDiaryEntryByDiaryId).mockResolvedValueOnce(updatedEntry);

    const result = await updateDiaryService(
      "user_001",
      "diary_001",
      "say hello to my little friend",
    );

    expect(result).toEqual(updatedEntry);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_001");
    expect(updateDiaryEntryByDiaryId).toHaveBeenCalledWith(
      "diary_001",
      updatedEntry.content,
    );
  });

  it("returns null if user does not exists", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await updateDiaryService(
      "user",
      "diary_001",
      "say hello to my little friend",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
    expect(findDiaryEntryByDiaryId).not.toHaveBeenCalledWith("diary_001");
    expect(updateDiaryEntryByDiaryId).not.toHaveBeenCalledWith(
      "diary_001",
      updatedEntry.content,
    );
  });

  it("returns null if diary entry does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(null);

    const result = await updateDiaryService(
      "user_001",
      "diary",
      "say hello to my little friend",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary");
    expect(updateDiaryEntryByDiaryId).not.toHaveBeenCalledWith(
      "diary",
      updatedEntry.content,
    );
  });

  it("returns null if diary entry is not of user", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(User2entry);

    const result = await updateDiaryService(
      "user_001",
      "diary_003",
      "say hello to my little friend",
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_003");
    expect(updateDiaryEntryByDiaryId).not.toHaveBeenCalledWith(
      "diary_003",
      updatedEntry.content,
    );
  });
});

describe("deleteDiaryService", () => {
  it("deleted a diary entry id", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(entry);
    vi.mocked(deleteDiaryEntryByDiaryId).mockResolvedValueOnce(entry);

    const result = await deleteDiaryService("user_001", "diary_001");

    expect(result).toEqual(entry);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_001");
    expect(deleteDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_001");
  });

  it("returns null if user not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await deleteDiaryService("user", "diary_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
    expect(deleteDiaryEntryByDiaryId).not.toHaveBeenCalledWith("diary_001");
  });

  it("returns null if entry not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(null);

    const result = await deleteDiaryService("user_001", "diary");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary");
    expect(updateDiaryEntryByDiaryId).not.toHaveBeenCalledWith("diary");
  });

  it("returns null if diary is not of user", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findDiaryEntryByDiaryId).mockResolvedValueOnce(User2entry);

    const result = await deleteDiaryService("user_001", "diary_003");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findDiaryEntryByDiaryId).toHaveBeenCalledWith("diary_003");
    expect(updateDiaryEntryByDiaryId).not.toHaveBeenCalledWith("diary_003");
  });
});

describe("postDiaryService", () => {
  const postEntry: DiaryEntry = {
    id: "diary_021",
    userId: "user_001",
    title: "Fight Club",
    content: "you do not talk about fight club",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  it("returns DiaryEntry that is posted", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(postDiaryEntry).mockResolvedValueOnce(postEntry);

    const result = await postDiaryService(
      "user_001",
      "Fight Club",
      "you do not talk about fight club",
      undefined,
    );

    expect(result).toEqual(postEntry);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(postDiaryEntry).toHaveBeenCalledWith(
      "user_001",
      "Fight Club",
      "you do not talk about fight club",
      undefined,
    );
  });

  it("returns null if user not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await postDiaryService(
      "user",
      "Fight Club",
      "you do not talk about fight club",
      undefined,
    );

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
    expect(postDiaryEntry).not.toHaveBeenCalledWith(
      "user_001",
      "Fight Club",
      "you do not talk about fight club",
      undefined,
    );
  });
});
