import { beforeEach, describe, expect, it } from "vitest";

import {
  getSobrietyByUserId,
  changeSobrietyByUserId,
  addSobrietyHistory,
  historySobrietyByUserId,
} from "../../src/features/sobriety/sobriety.repository.ts";

import {
  sobrietyRecords,
  sobrietyHistory,
} from "../../src/features/sobriety/sobriety.mock.ts";

const initialSobrietyRecords = structuredClone(sobrietyRecords);
const initialSobrietyHistory = structuredClone(sobrietyHistory);

beforeEach(() => {
  sobrietyRecords.length = 0;
  sobrietyRecords.push(...structuredClone(initialSobrietyRecords));

  sobrietyHistory.length = 0;
  sobrietyHistory.push(...structuredClone(initialSobrietyHistory));
});

describe("getSobrietyByUserId", () => {
  it("returns Sobriety record if user exists", async () => {
    const result = await getSobrietyByUserId("user_001");

    expect(result).toEqual({
      createdAt: expect.any(String),
      id: "sobriety_001",
      longestStreak: 45,
      startDate: "2026-07-01",
      totalMeetings: 12,
      updatedAt: expect.any(String),
      userId: "user_001",
    });
  });

  it("returns null if user does not exist", async () => {
    const result = await getSobrietyByUserId("user");

    expect(result).toBeNull();
  });
});

describe("changeSobrietyByUserId", () => {
  it("returns updated Sobriety record if user exists", async () => {
    const result = await changeSobrietyByUserId(
      "user_001",
      "2026-08-31T10:00:00.000Z",
      42,
      "2026-08-31T10:30:00.000Z",
    );

    expect(result).toEqual({
      id: "sobriety_001",
      userId: "user_001",
      startDate: "2026-08-31T10:00:00.000Z",
      longestStreak: 42,
      totalMeetings: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: "2026-08-31T10:30:00.000Z",
    });

    const updatedEntry = await getSobrietyByUserId("user_001");

    expect(updatedEntry).toEqual(result);
  });

  it("returns null if user does not exist", async () => {
    const result = await changeSobrietyByUserId(
      "user",
      "2026-08-31T10:00:00.000Z",
      42,
      "2026-08-31T10:30:00.000Z",
    );

    expect(result).toBeNull();
  });
});

describe("addSobrietyHistory", () => {
  it("returns and persists a new SobrietyHistory entry", async () => {
    const result = await addSobrietyHistory(
      "user_001",
      "2026-08-01T00:00:00.000Z",
      "2026-08-31T00:00:00.000Z",
      30,
    );

    expect(result).toEqual({
      id: expect.any(String),
      userId: "user_001",
      startDate: "2026-08-01T00:00:00.000Z",
      endDate: "2026-08-31T00:00:00.000Z",
      durationDays: 30,
      createdAt: expect.any(String),
    });

    const history = await historySobrietyByUserId("user_001");

    expect(history).toContainEqual(result);
  });
});

describe("historySobrietyByUserId", () => {
  it("returns SobrietyHistory array if user has history", async () => {
    const result = await historySobrietyByUserId("user_001");

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          userId: "user_001",
          startDate: expect.any(String),
          endDate: expect.any(String),
          durationDays: expect.any(Number),
          createdAt: expect.any(String),
        }),
      ]),
    );
  });

  it("returns null if user has no sobriety history", async () => {
    const result = await historySobrietyByUserId("user_999");

    expect(result).toBeNull();
  });
});
