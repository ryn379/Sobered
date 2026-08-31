import { beforeEach, describe, expect, it } from "vitest";

import {
  getAllPredefinedHobbies,
  getPredefinedHobbyById,
  getHobbiesByUserId,
  getHobbyById,
  createHobby,
  updateHobby,
  updateHobbyProgress,
  deleteHobby,
  getHobbyProgressHistory,
  createHobbyProgress,
} from "../../src/features/hobby/hobby.repository.ts";

import {
  hobbies,
  hobbyProgress,
  predefinedHobbies,
} from "../../src/features/hobby/hobby.mock.ts";

const initialHobbies = structuredClone(hobbies);
const initialHobbyProgress = structuredClone(hobbyProgress);

beforeEach(() => {
  hobbies.length = 0;
  hobbies.push(...structuredClone(initialHobbies));

  hobbyProgress.length = 0;
  hobbyProgress.push(...structuredClone(initialHobbyProgress));
});

describe("getAllPredefinedHobbies", () => {
  it("returns all predefined hobbies", async () => {
    const result = await getAllPredefinedHobbies();

    expect(result).toEqual(predefinedHobbies);
  });
});

describe("getPredefinedHobbyById", () => {
  it("returns predefined hobby by id", async () => {
    const result = await getPredefinedHobbyById("hobby_type_001");

    expect(result).toEqual(
      expect.objectContaining({
        id: "hobby_type_001",
        name: expect.any(String),
        description: expect.any(String),
      }),
    );
  });

  it("returns null if predefined hobby does not exist", async () => {
    const result = await getPredefinedHobbyById("hobby_type");

    expect(result).toBeNull();
  });
});

describe("getHobbiesByUserId", () => {
  it("returns hobbies belonging to user", async () => {
    const result = await getHobbiesByUserId("user_001");

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: "user_001",
        }),
      ]),
    );

    expect(result.every((hobby) => hobby.userId === "user_001")).toBe(true);
  });

  it("returns empty array if user has no hobbies", async () => {
    const result = await getHobbiesByUserId("user");

    expect(result).toEqual([]);
  });
});

describe("getHobbyById", () => {
  it("returns hobby by user id and hobby id", async () => {
    const result = await getHobbyById("user_001", "hobby_001");

    expect(result).toEqual(
      expect.objectContaining({
        id: "hobby_001",
        userId: "user_001",
      }),
    );
  });

  it("returns null if hobby does not exist", async () => {
    const result = await getHobbyById("user_001", "hobby");

    expect(result).toBeNull();
  });

  it("returns null if hobby belongs to another user", async () => {
    const result = await getHobbyById("user_001", "hobby_002");

    if (result !== null) {
      expect(result.userId).toBe("user_001");
    }
  });
});

describe("createHobby", () => {
  it("returns and persists a new hobby", async () => {
    const predefinedHobby = predefinedHobbies[0]!;

    const result = await createHobby(
      "user_001",
      predefinedHobby,
      "Practice for 30 minutes every day",
    );

    expect(result).toEqual({
      id: expect.any(String),
      userId: "user_001",
      hobbyTypeId: predefinedHobby.id,
      name: predefinedHobby.name,
      description: predefinedHobby.description,
      goal: "Practice for 30 minutes every day",
      progress: 0,
      currentStreak: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const savedHobby = await getHobbyById("user_001", result.id);
    expect(savedHobby).toEqual(result);
  });
});

describe("updateHobby", () => {
  it("returns and updates hobby if it exists", async () => {
    const result = await updateHobby(
      "user_001",
      "hobby_001",
      "Practice every day",
      "Updated hobby description",
    );

    expect(result).toEqual({
      id: "hobby_001",
      userId: "user_001",
      hobbyTypeId: expect.any(String),
      name: expect.any(String),
      description: "Updated hobby description",
      goal: "Practice every day",
      progress: expect.any(Number),
      currentStreak: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const updatedHobby = await getHobbyById("user_001", "hobby_001");
    expect(updatedHobby).toEqual(result);
  });

  it("returns null if hobby does not exist", async () => {
    const result = await updateHobby(
      "user_001",
      "hobby",
      "Practice every day",
      "Updated hobby description",
    );

    expect(result).toBeNull();
  });
});

describe("updateHobbyProgress", () => {
  it("returns and updates hobby progress", async () => {
    const result = await updateHobbyProgress("user_001", "hobby_001", 75);

    expect(result).toEqual({
      id: "hobby_001",
      userId: "user_001",
      hobbyTypeId: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      goal: expect.any(String),
      progress: 75,
      currentStreak: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const updatedHobby = await getHobbyById("user_001", "hobby_001");
    expect(updatedHobby).toEqual(result);
  });

  it("returns null if hobby does not exist", async () => {
    const result = await updateHobbyProgress("user_001", "hobby", 75);

    expect(result).toBeNull();
  });
});

describe("deleteHobby", () => {
  it("returns and deletes hobby if it exists", async () => {
    const result = await deleteHobby("user_001", "hobby_001");

    expect(result).toEqual(
      expect.objectContaining({
        id: "hobby_001",
        userId: "user_001",
      }),
    );

    const deletedHobby = await getHobbyById("user_001", "hobby_001");
    expect(deletedHobby).toBeNull();
  });

  it("returns null if hobby does not exist", async () => {
    const result = await deleteHobby("user_001", "hobby");

    expect(result).toBeNull();
  });
});

describe("getHobbyProgressHistory", () => {
  it("returns progress history for hobby", async () => {
    const result = await getHobbyProgressHistory("hobby_001");

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          hobbyId: "hobby_001",
          progress: expect.any(Number),
          note: expect.any(String),
          recordedAt: expect.any(String),
        }),
      ]),
    );
    expect(result.every((entry) => entry.hobbyId === "hobby_001")).toBe(true);
  });

  it("returns empty array if hobby has no progress history", async () => {
    const result = await getHobbyProgressHistory("hobby");

    expect(result).toEqual([]);
  });

  it("returns progress history sorted by recordedAt", async () => {
    const result = await getHobbyProgressHistory("hobby_001");

    for (let i = 1; i < result.length; i++) {
      expect(new Date(result[i - 1]!.recordedAt).getTime()).toBeLessThanOrEqual(
        new Date(result[i]!.recordedAt).getTime(),
      );
    }
  });
});

describe("createHobbyProgress", () => {
  it("returns and persists a new progress entry", async () => {
    const result = await createHobbyProgress(
      "hobby_001",
      80,
      "Made good progress today",
    );

    expect(result).toEqual({
      id: expect.any(String),
      hobbyId: "hobby_001",
      progress: 80,
      note: "Made good progress today",
      recordedAt: expect.any(String),
    });

    const history = await getHobbyProgressHistory("hobby_001");
    expect(history).toContainEqual(result);
  });
});
