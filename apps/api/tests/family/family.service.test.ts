import { describe, it, expect, vi, beforeEach } from "vitest";

import {
  getFamilyService,
  SobrietyFamilyService,
  getRecovererFromFamilyService,
} from "../../src/features/family/family.service.ts";

import { findUserByUserId } from "../../src/features/user/user.repository.ts";

import {
  getFamilyByUserId,
  getRecovererByFamilyUserId,
} from "../../src/features/family/family.repository.ts";

import { statsSobrietyService } from "../../src/features/sobriety/sobriety.service.ts";

import type { User } from "../../src/features/user/user.mock.ts";
import type { SobrietyStats } from "../../src/features/sobriety/sobriety.mock.ts";

vi.mock("../../src/features/user/user.repository.ts");
vi.mock("../../src/features/family/family.repository.ts");
vi.mock("../../src/features/sobriety/sobriety.service.ts");

beforeEach(() => {
  vi.resetAllMocks();
});

const recoveringUser: User = {
  id: "user_001",
  username: "alex_recovery",
  email: "alex@example.com",
  role: "RECOVERING_USER",
  createdAt: "2026-07-01T10:00:00.000Z",
};

const familyUser: User = {
  id: "user_003",
  username: "jordan_support",
  email: "jordan@example.com",
  role: "FAMILY_MEMBER",
  createdAt: "2026-07-10T09:15:00.000Z",
};

describe("getFamilyService", () => {
  it("returns family members of recovering user", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(recoveringUser);
    vi.mocked(getFamilyByUserId).mockResolvedValueOnce([familyUser]);

    const result = await getFamilyService("user_001");

    expect(result).toEqual([familyUser]);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getFamilyByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getFamilyService("user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getFamilyByUserId).not.toHaveBeenCalled();
  });

  it("returns null if user is not a recovering user", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(familyUser);

    const result = await getFamilyService("user_003");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(getFamilyByUserId).not.toHaveBeenCalled();
  });
});

describe("SobrietyFamilyService", () => {
  const sobrietyStats: SobrietyStats = {
    currentStreak: 20,
    longestStreak: 30,
    totalDaysSober: 50,
    totalSobrietyPeriods: 2,
    totalMeetings: 10,
    startDate: "2026-08-01T10:00:00.000Z",
  };

  it("returns sobriety stats if user is family of recoverer", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(familyUser)
      .mockResolvedValueOnce(recoveringUser);
    vi.mocked(getFamilyByUserId).mockResolvedValueOnce([familyUser]);
    vi.mocked(statsSobrietyService).mockResolvedValueOnce(sobrietyStats);

    const result = await SobrietyFamilyService("user_003", "user_001");

    expect(result).toEqual(sobrietyStats);
    expect(findUserByUserId).toHaveBeenNthCalledWith(1, "user_003");
    expect(findUserByUserId).toHaveBeenNthCalledWith(2, "user_001");
    expect(getFamilyByUserId).toHaveBeenCalledWith("user_001");
    expect(statsSobrietyService).toHaveBeenCalledWith("user_001");
  });

  it("returns null if family user does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(recoveringUser);

    const result = await SobrietyFamilyService("user_003", "user_001");

    expect(result).toBeNull();
    expect(getFamilyByUserId).not.toHaveBeenCalled();
    expect(statsSobrietyService).not.toHaveBeenCalled();
  });

  it("returns null if recoverer does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(familyUser)
      .mockResolvedValueOnce(null);

    const result = await SobrietyFamilyService("user_003", "user_001");

    expect(result).toBeNull();
    expect(getFamilyByUserId).not.toHaveBeenCalled();
    expect(statsSobrietyService).not.toHaveBeenCalled();
  });

  it("returns null if user is not family of recoverer", async () => {
    const anotherFamilyUser: User = {
      id: "user_005",
      username: "another_support",
      email: "another@example.com",
      role: "FAMILY_MEMBER",
      createdAt: "2026-07-15T09:15:00.000Z",
    };

    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(familyUser)
      .mockResolvedValueOnce(recoveringUser);
    vi.mocked(getFamilyByUserId).mockResolvedValueOnce([anotherFamilyUser]);

    const result = await SobrietyFamilyService("user_003", "user_001");

    expect(result).toBeNull();
    expect(getFamilyByUserId).toHaveBeenCalledWith("user_001");
    expect(statsSobrietyService).not.toHaveBeenCalled();
  });

  it("returns null if sobriety stats do not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(familyUser)
      .mockResolvedValueOnce(recoveringUser);
    vi.mocked(getFamilyByUserId).mockResolvedValueOnce([familyUser]);
    vi.mocked(statsSobrietyService).mockResolvedValueOnce(null);

    const result = await SobrietyFamilyService("user_003", "user_001");

    expect(result).toBeNull();
    expect(statsSobrietyService).toHaveBeenCalledWith("user_001");
  });
});

describe("getRecovererFromFamilyService", () => {
  it("returns recoverers of family member", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(familyUser);
    vi.mocked(getRecovererByFamilyUserId).mockResolvedValueOnce([
      recoveringUser,
    ]);

    const result = await getRecovererFromFamilyService("user_003");

    expect(result).toEqual([recoveringUser]);
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(getRecovererByFamilyUserId).toHaveBeenCalledWith("user_003");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getRecovererFromFamilyService("user_003");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(getRecovererByFamilyUserId).not.toHaveBeenCalled();
  });

  it("returns null if user is not a family member", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(recoveringUser);

    const result = await getRecovererFromFamilyService("user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getRecovererByFamilyUserId).not.toHaveBeenCalled();
  });
});
