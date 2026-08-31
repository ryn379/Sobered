import { describe, it, expect, vi, beforeEach } from "vitest";

import { findUserByUserId } from "../../src/features/user/user.repository.ts";

import {
  createHobby,
  createHobbyProgress,
  deleteHobby,
  getAllPredefinedHobbies,
  getHobbiesByUserId,
  getHobbyById,
  getHobbyProgressHistory,
  getPredefinedHobbyById,
  updateHobby,
  updateHobbyProgress,
} from "../../src/features/hobby/hobby.repository.ts";

import {
  getHobbyTypesService,
  getHobbyTypeService,
  getUserHobbiesService,
  getUserHobbyService,
  getHobbyProgressService,
  createHobbyService,
  updateHobbyService,
  updateHobbyProgressService,
  deleteHobbyService,
  getAnalysisHobbyService,
} from "../../src/features/hobby/hobby.service.ts";

import type {
  Hobby,
  HobbyProgress,
  PredefinedHobby,
} from "../../src/features/hobby/hobby.mock.ts";

import type { User } from "../../src/features/user/user.mock.ts";

vi.mock("../../src/features/user/user.repository.ts");
vi.mock("../../src/features/hobby/hobby.repository.ts");

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

const hobby: Hobby = {
  id: "hobby_001",
  userId: "user_001",
  hobbyTypeId: "hobby_type_001",
  name: "Reading",
  description: "Read books regularly",
  goal: "Read 30 minutes every day",
  progress: 50,
  currentStreak: 5,
  createdAt: "2026-07-10T10:00:00.000Z",
  updatedAt: "2026-07-10T10:00:00.000Z",
};

const hobbyType: PredefinedHobby = {
  id: "hobby_type_001",
  name: "Reading",
  description: "Read books regularly",
};

const progressHistory: HobbyProgress[] = [
  {
    id: "progress_001",
    hobbyId: "hobby_001",
    progress: 20,
    note: "Started reading",
    recordedAt: "2026-07-10T10:00:00.000Z",
  },
  {
    id: "progress_002",
    hobbyId: "hobby_001",
    progress: 50,
    note: "Made progress",
    recordedAt: "2026-07-15T10:00:00.000Z",
  },
];

describe("getHobbyTypesService", () => {
  it("returns all predefined hobbies", async () => {
    vi.mocked(getAllPredefinedHobbies).mockResolvedValueOnce([hobbyType]);

    const result = await getHobbyTypesService();

    expect(result).toEqual([hobbyType]);
    expect(getAllPredefinedHobbies).toHaveBeenCalled();
  });
});

describe("getHobbyTypeService", () => {
  it("returns predefined hobby by id", async () => {
    vi.mocked(getPredefinedHobbyById).mockResolvedValueOnce(hobbyType);

    const result = await getHobbyTypeService("hobby_type_001");

    expect(result).toEqual(hobbyType);
    expect(getPredefinedHobbyById).toHaveBeenCalledWith("hobby_type_001");
  });

  it("returns null if hobby type does not exist", async () => {
    vi.mocked(getPredefinedHobbyById).mockResolvedValueOnce(null);

    const result = await getHobbyTypeService("hobby_type");

    expect(result).toBeNull();
    expect(getPredefinedHobbyById).toHaveBeenCalledWith("hobby_type");
  });
});

describe("getUserHobbiesService", () => {
  it("returns user's hobbies", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getHobbiesByUserId).mockResolvedValueOnce([hobby]);

    const result = await getUserHobbiesService("user_001");

    expect(result).toEqual([hobby]);

    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getHobbiesByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getUserHobbiesService("user_001");

    expect(result).toBeNull();

    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getHobbiesByUserId).not.toHaveBeenCalled();
  });
});

describe("getUserHobbyService", () => {
  it("returns user's hobby", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);

    const result = await getUserHobbyService("user_001", "hobby_001");

    expect(result).toEqual(hobby);

    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getUserHobbyService("user_001", "hobby_001");

    expect(result).toBeNull();

    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getHobbyById).not.toHaveBeenCalled();
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await getUserHobbyService("user_001", "hobby_001");

    expect(result).toBeNull();

    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
  });
});

describe("getHobbyProgressService", () => {
  it("returns hobby progress", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);

    const result = await getHobbyProgressService("user_001", "hobby_001");

    expect(result).toBe(50);
    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await getHobbyProgressService("user_001", "hobby_001");

    expect(result).toBeNull();
  });
});

describe("createHobbyService", () => {
  it("creates and returns a hobby", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getPredefinedHobbyById).mockResolvedValueOnce(hobbyType);
    vi.mocked(createHobby).mockResolvedValueOnce(hobby);

    const result = await createHobbyService(
      "user_001",
      "hobby_type_001",
      "Read 30 minutes every day",
    );

    expect(result).toEqual(hobby);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getPredefinedHobbyById).toHaveBeenCalledWith("hobby_type_001");
    expect(createHobby).toHaveBeenCalledWith(
      "user_001",
      hobbyType,
      "Read 30 minutes every day",
    );
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await createHobbyService(
      "user_001",
      "hobby_type_001",
      "Read every day",
    );

    expect(result).toBeNull();
    expect(getPredefinedHobbyById).not.toHaveBeenCalled();
    expect(createHobby).not.toHaveBeenCalled();
  });

  it("returns null if hobby type does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getPredefinedHobbyById).mockResolvedValueOnce(null);

    const result = await createHobbyService(
      "user_001",
      "hobby_type",
      "Read every day",
    );

    expect(result).toBeNull();
    expect(createHobby).not.toHaveBeenCalled();
  });
});

describe("updateHobbyService", () => {
  it("updates and returns hobby", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(updateHobby).mockResolvedValueOnce(hobby);

    const result = await updateHobbyService(
      "user_001",
      "hobby_001",
      "Read every day",
      "Updated description",
    );

    expect(result).toEqual(hobby);
    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
    expect(updateHobby).toHaveBeenCalledWith(
      "user_001",
      "hobby_001",
      "Read every day",
      "Updated description",
    );
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await updateHobbyService(
      "user_001",
      "hobby_001",
      "Read every day",
      "Updated description",
    );

    expect(result).toBeNull();
    expect(updateHobby).not.toHaveBeenCalled();
  });

  it("returns null if update fails", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(updateHobby).mockResolvedValueOnce(null);

    const result = await updateHobbyService(
      "user_001",
      "hobby_001",
      "Read every day",
      "Updated description",
    );

    expect(result).toBeNull();
  });
});

describe("updateHobbyProgressService", () => {
  it("updates progress and creates progress history", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(updateHobbyProgress).mockResolvedValueOnce({
      ...hobby,
      progress: 75,
    });
    vi.mocked(createHobbyProgress).mockResolvedValueOnce({
      id: "progress_003",
      hobbyId: "hobby_001",
      progress: 75,
      note: "Good progress",
      recordedAt: new Date().toISOString(),
    });

    const result = await updateHobbyProgressService(
      "user_001",
      "hobby_001",
      75,
      "Good progress",
    );

    expect(result).toEqual({
      ...hobby,
      progress: 75,
    });
    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
    expect(updateHobbyProgress).toHaveBeenCalledWith(
      "user_001",
      "hobby_001",
      75,
    );
    expect(createHobbyProgress).toHaveBeenCalledWith(
      "hobby_001",
      75,
      "Good progress",
    );
  });

  it("returns null if progress is below 0", async () => {
    const result = await updateHobbyProgressService(
      "user_001",
      "hobby_001",
      -1,
      "Invalid",
    );

    expect(result).toBeNull();
    expect(getHobbyById).not.toHaveBeenCalled();
  });

  it("returns null if progress is above 100", async () => {
    const result = await updateHobbyProgressService(
      "user_001",
      "hobby_001",
      101,
      "Invalid",
    );

    expect(result).toBeNull();
    expect(getHobbyById).not.toHaveBeenCalled();
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await updateHobbyProgressService(
      "user_001",
      "hobby_001",
      75,
      "Good progress",
    );

    expect(result).toBeNull();
    expect(updateHobbyProgress).not.toHaveBeenCalled();
    expect(createHobbyProgress).not.toHaveBeenCalled();
  });

  it("returns null if updating progress fails", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(updateHobbyProgress).mockResolvedValueOnce(null);

    const result = await updateHobbyProgressService(
      "user_001",
      "hobby_001",
      75,
      "Good progress",
    );

    expect(result).toBeNull();
    expect(createHobbyProgress).not.toHaveBeenCalled();
  });
});

describe("deleteHobbyService", () => {
  it("deletes and returns hobby", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(deleteHobby).mockResolvedValueOnce(hobby);

    const result = await deleteHobbyService("user_001", "hobby_001");

    expect(result).toEqual(hobby);
    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
    expect(deleteHobby).toHaveBeenCalledWith("user_001", "hobby_001");
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await deleteHobbyService("user_001", "hobby_001");

    expect(result).toBeNull();
    expect(deleteHobby).not.toHaveBeenCalled();
  });

  it("returns null if delete fails", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(deleteHobby).mockResolvedValueOnce(null);

    const result = await deleteHobbyService("user_001", "hobby_001");
    expect(result).toBeNull();
  });
});

describe("getAnalysisHobbyService", () => {
  it("returns analysis for hobby with progress history", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(getHobbyProgressHistory).mockResolvedValueOnce(progressHistory);

    const result = await getAnalysisHobbyService("user_001", "hobby_001");

    expect(result).toEqual({
      hobbyId: "hobby_001",
      goal: "Read 30 minutes every day",
      currentProgress: 50,
      currentStreak: 5,
      trend: "IMPROVING",
      improvement: 30,
      averageProgressChange: 30,
      status: "IN_PROGRESS",
      history: progressHistory,
    });

    expect(getHobbyById).toHaveBeenCalledWith("user_001", "hobby_001");
    expect(getHobbyProgressHistory).toHaveBeenCalledWith("hobby_001");
  });

  it("returns NO_DATA if hobby has no progress history", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(getHobbyProgressHistory).mockResolvedValueOnce([]);

    const result = await getAnalysisHobbyService("user_001", "hobby_001");

    expect(result).toEqual({
      hobbyId: "hobby_001",
      currentProgress: 50,
      currentStreak: 5,
      trend: "NO_DATA",
      improvement: 0,
      averageProgressChange: 0,
      consistency: 0,
      status: "NOT_STARTED",
      history: [],
    });
  });

  it("returns null if hobby does not exist", async () => {
    vi.mocked(getHobbyById).mockResolvedValueOnce(null);

    const result = await getAnalysisHobbyService("user_001", "hobby_001");

    expect(result).toBeNull();
    expect(getHobbyProgressHistory).not.toHaveBeenCalled();
  });

  it("returns DECLINING when progress decreases", async () => {
    const decliningHistory: HobbyProgress[] = [
      {
        ...progressHistory[0]!,
        progress: 80,
      },
      {
        ...progressHistory[1]!,
        progress: 40,
      },
    ];

    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(getHobbyProgressHistory).mockResolvedValueOnce(decliningHistory);

    const result = await getAnalysisHobbyService("user_001", "hobby_001");

    expect(result?.trend).toBe("DECLINING");
    expect(result?.improvement).toBe(-40);
  });

  it("returns STABLE when progress does not change", async () => {
    const stableHistory: HobbyProgress[] = [
      {
        ...progressHistory[0]!,
        progress: 50,
      },
      {
        ...progressHistory[1]!,
        progress: 50,
      },
    ];

    vi.mocked(getHobbyById).mockResolvedValueOnce(hobby);
    vi.mocked(getHobbyProgressHistory).mockResolvedValueOnce(stableHistory);

    const result = await getAnalysisHobbyService("user_001", "hobby_001");

    expect(result?.trend).toBe("STABLE");
    expect(result?.improvement).toBe(0);
  });
});
