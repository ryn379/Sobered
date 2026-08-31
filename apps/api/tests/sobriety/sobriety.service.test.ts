import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  addSobrietyHistory,
  changeSobrietyByUserId,
  getSobrietyByUserId,
  historySobrietyByUserId,
} from "../../src/features/sobriety/sobriety.repository.ts";

import {
  changeSobrietyService,
  getSobrietyService,
  historySobrietyService,
  statsSobrietyService,
} from "../../src/features/sobriety/sobriety.service.ts";

vi.mock("../../src/features/sobriety/sobriety.repository.ts");

const userSobriety = {
  id: "sobriety_001",
  userId: "user_001",
  startDate: "2026-08-01T00:00:00.000Z",
  longestStreak: 20,
  totalMeetings: 5,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
};

const historyEntry = {
  id: "history_001",
  userId: "user_001",
  startDate: "2026-07-01T00:00:00.000Z",
  endDate: "2026-07-15T00:00:00.000Z",
  durationDays: 14,
  createdAt: "2026-07-15T00:00:00.000Z",
};

beforeEach(() => {
  vi.resetAllMocks();
});

describe("getSobrietyService", () => {
  it("returns Sobriety record", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(userSobriety);

    const result = await getSobrietyService("user_001");

    expect(result).toEqual(userSobriety);
    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if Sobriety record does not exist", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(null);

    const result = await getSobrietyService("user_001");

    expect(result).toBeNull();
    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");
  });
});

describe("changeSobrietyService", () => {
  it("changes sobriety, adds history and returns updated Sobriety", async () => {
    const updatedSobriety = {
      ...userSobriety,
      startDate: expect.any(String),
      longestStreak: expect.any(Number),
      updatedAt: expect.any(String),
    };

    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(userSobriety);
    vi.mocked(addSobrietyHistory).mockResolvedValueOnce(historyEntry);
    vi.mocked(changeSobrietyByUserId).mockResolvedValueOnce(
      updatedSobriety as typeof userSobriety,
    );

    const result = await changeSobrietyService("user_001");

    expect(result).toEqual(updatedSobriety);
    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");
    expect(addSobrietyHistory).toHaveBeenCalledWith(
      "user_001",
      userSobriety.startDate,
      expect.any(String),
      expect.any(Number),
    );
    expect(changeSobrietyByUserId).toHaveBeenCalledWith(
      "user_001",
      expect.any(String),
      expect.any(Number),
      expect.any(String),
    );
  });

  it("returns null if Sobriety record does not exist", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(null);

    const result = await changeSobrietyService("user_001");

    expect(result).toBeNull();

    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");

    expect(addSobrietyHistory).not.toHaveBeenCalled();

    expect(changeSobrietyByUserId).not.toHaveBeenCalled();
  });
});

describe("statsSobrietyService", () => {
  it("returns sobriety statistics", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(userSobriety);
    vi.mocked(historySobrietyByUserId).mockResolvedValueOnce([historyEntry]);

    const result = await statsSobrietyService("user_001");

    expect(result).toEqual({
      currentStreak: expect.any(Number),
      longestStreak: 20,
      totalDaysSober: expect.any(Number),
      totalSobrietyPeriods: 2,
      totalMeetings: 5,
      startDate: "2026-08-01T00:00:00.000Z",
    });
    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");
    expect(historySobrietyByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if Sobriety record does not exist", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(null);
    vi.mocked(historySobrietyByUserId).mockResolvedValueOnce(null);

    const result = await statsSobrietyService("user_001");

    expect(result).toBeNull();
    expect(getSobrietyByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns stats with zero historical days if history does not exist", async () => {
    vi.mocked(getSobrietyByUserId).mockResolvedValueOnce(userSobriety);
    vi.mocked(historySobrietyByUserId).mockResolvedValueOnce(null);

    const result = await statsSobrietyService("user_001");

    expect(result).toEqual({
      currentStreak: expect.any(Number),
      longestStreak: 20,
      totalDaysSober: expect.any(Number),
      totalSobrietyPeriods: 0,
      totalMeetings: 5,
      startDate: "2026-08-01T00:00:00.000Z",
    });
    expect(historySobrietyByUserId).toHaveBeenCalledWith("user_001");
  });
});

describe("historySobrietyService", () => {
  it("returns sobriety history", async () => {
    vi.mocked(historySobrietyByUserId).mockResolvedValueOnce([historyEntry]);

    const result = await historySobrietyService("user_001");

    expect(result).toEqual([historyEntry]);
    expect(historySobrietyByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if sobriety history does not exist", async () => {
    vi.mocked(historySobrietyByUserId).mockResolvedValueOnce(null);

    const result = await historySobrietyService("user_001");

    expect(result).toBeNull();
    expect(historySobrietyByUserId).toHaveBeenCalledWith("user_001");
  });
});
