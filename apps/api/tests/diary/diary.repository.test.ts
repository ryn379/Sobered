import { describe, it, expect, beforeEach } from "vitest";
import {
  deleteDiaryEntryByDiaryId,
  findDiaryEntryByDiaryId,
  findDiaryEntryByUserId,
  postDiaryEntry,
  updateDiaryEntryByDiaryId,
} from "../../src/features/diary/diary.repository.ts";
import { diaryEntries } from "../../src/features/diary/diary.mock.ts";

const initialDiaryEntries = structuredClone(diaryEntries);

beforeEach(() => {
  diaryEntries.length = 0;
  diaryEntries.push(...structuredClone(initialDiaryEntries));
});

describe("findDiaryEntryByUserId", () => {
  it("returns DiaryEntry array", async () => {
    const result = await findDiaryEntryByUserId("user_001");

    expect(result).toEqual([
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
    ]);
  });
});

describe("findDiaryEntryByDiaryId", () => {
  it("returnd a DiaryEntry by Id", async () => {
    const result = await findDiaryEntryByDiaryId("diary_001");

    expect(result).toEqual({
      id: "diary_001",
      userId: "user_001",
      title: "First difficult week",
      content:
        "This week was difficult, but I managed to attend two meetings and talk to my sponsor.",
      mood: "anxious",
      createdAt: "2026-07-10T18:30:00.000Z",
      updatedAt: "2026-07-10T18:30:00.000Z",
    });
  });
});

describe("updateDiaryEntryByDiaryId", () => {
  it("returns DiaryEntry and updates if exists", async () => {
    const result = await updateDiaryEntryByDiaryId(
      "diary_001",
      "this is updated",
    );

    expect(result).toEqual({
      id: "diary_001",
      userId: "user_001",
      title: "First difficult week",
      content: "this is updated",
      mood: "anxious",
      createdAt: "2026-07-10T18:30:00.000Z",
      updatedAt: expect.any(String),
    });

    const updatedEntry = await findDiaryEntryByDiaryId(result!.id);

    expect(updatedEntry?.content).toBe("this is updated");
  });

  it("returns null if entry does not exist", async () => {
    const result = await updateDiaryEntryByDiaryId("diary", "this is updated");

    expect(result).toBeNull();
  });
});

describe("deleteDiaryEntryByDiaryId", () => {
  it("returns deleted DiaryEntry if exists", async () => {
    const result = await deleteDiaryEntryByDiaryId("diary_002");

    expect(result).toEqual({
      id: "diary_002",
      userId: "user_001",
      title: "A better day",
      content:
        "I went for a walk instead of drinking. It helped more than I expected.",
      mood: "hopeful",
      createdAt: "2026-07-12T19:00:00.000Z",
      updatedAt: expect.any(String),
    });

    const deletedEntry = await findDiaryEntryByDiaryId("diary_002");

    expect(deletedEntry).toBeNull();
  });

  it("returns null if DiaryEntry does not exist", async () => {
    const result = await deleteDiaryEntryByDiaryId("diary");

    expect(result).toBeNull();
  });
});

describe("postDiaryEntry", () => {
  it("returns the new posted DiaryEntry", async () => {
    const result = await postDiaryEntry(
      "user_001",
      "New",
      "this is new",
      "depressed",
    );

    expect(result).toEqual({
      id: expect.any(String),
      userId: "user_001",
      title: "New",
      content: "this is new",
      mood: "depressed",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const savedEntry = await findDiaryEntryByDiaryId(result.id);

    expect(savedEntry).toEqual(result);
  });
});
