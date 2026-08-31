import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../../src/app.ts";

import { hobbies, hobbyProgress } from "../../src/features/hobby/hobby.mock.ts";

const initialHobbies = structuredClone(hobbies);
const initialHobbyProgress = structuredClone(hobbyProgress);

beforeEach(() => {
  hobbies.length = 0;
  hobbies.push(...structuredClone(initialHobbies));

  hobbyProgress.length = 0;
  hobbyProgress.push(...structuredClone(initialHobbyProgress));
});

describe("GET /types", () => {
  it("returns all predefined hobby types", async () => {
    const response = await request(app).get("/api/hobby/types");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      types: expect.any(Array),
    });
  });
});

describe("GET /types/:hobbyTypeId", () => {
  it("returns predefined hobby type", async () => {
    const response = await request(app).get("/api/hobby/types/hobby_type_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "hobby_type_001",
        name: expect.any(String),
        description: expect.any(String),
      },
    });
  });

  it("returns 404 if hobby type does not exist", async () => {
    const response = await request(app).get("/api/hobby/types/hobby_type");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId", () => {
  it("returns hobbies of user", async () => {
    const response = await request(app).get("/api/hobby/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).get("/api/hobby/user");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/:hobbyId", () => {
  it("returns hobby of user", async () => {
    const response = await request(app).get("/api/hobby/user_001/hobby_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: "hobby_001",
        userId: "user_001",
      }),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).get("/api/hobby/user/hobby_001");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not exist", async () => {
    const response = await request(app).get("/api/hobby/user_001/hobby");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not belong to user", async () => {
    const response = await request(app).get("/api/hobby/user_001/hobby_003");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/:hobbyId/analysis", () => {
  it("returns hobby analysis", async () => {
    const response = await request(app).get(
      "/api/hobby/user_001/hobby_001/analysis",
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        hobbyId: "hobby_001",
        currentProgress: expect.any(Number),
        currentStreak: expect.any(Number),
        trend: expect.any(String),
        improvement: expect.any(Number),
        averageProgressChange: expect.any(Number),
        status: expect.any(String),
        history: expect.any(Array),
      }),
    });
  });

  it("returns 404 if hobby does not exist", async () => {
    const response = await request(app).get(
      "/api/hobby/user_001/hobby/analysis",
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not belong to user", async () => {
    const response = await request(app).get(
      "/api/hobby/user_001/hobby_003/analysis",
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("POST /:userId", () => {
  it("creates and returns a hobby", async () => {
    const response = await request(app).post("/api/hobby/user_001").send({
      hobbyTypeId: "hobby_type_001",
      goal: "Practice for 30 minutes every day",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: expect.any(String),
        userId: "user_001",
        hobbyTypeId: "hobby_type_001",
        name: expect.any(String),
        description: expect.any(String),
        goal: "Practice for 30 minutes every day",
        progress: 0,
        currentStreak: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 400 if hobby type id is missing", async () => {
    const response = await request(app).post("/api/hobby/user_001").send({
      goal: "Practice every day",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 400 if goal is missing", async () => {
    const response = await request(app).post("/api/hobby/user_001").send({
      hobbyTypeId: "hobby_type_001",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).post("/api/hobby/user").send({
      hobbyTypeId: "hobby_type_001",
      goal: "Practice every day",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby type does not exist", async () => {
    const response = await request(app).post("/api/hobby/user_001").send({
      hobbyTypeId: "hobby_type",
      goal: "Practice every day",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("PATCH /:userId/:hobbyId", () => {
  it("updates and returns hobby", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001")
      .send({
        goal: "Practice for 60 minutes every day",
        description: "Updated description",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "hobby_001",
        userId: "user_001",
        hobbyTypeId: expect.any(String),
        name: expect.any(String),
        description: "Updated description",
        goal: "Practice for 60 minutes every day",
        progress: expect.any(Number),
        currentStreak: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 400 if goal is missing", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001")
      .send({
        description: "Updated description",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 400 if description is missing", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001")
      .send({
        goal: "Practice every day",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not exist", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby")
      .send({
        goal: "Practice every day",
        description: "Updated description",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not belong to user", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_003")
      .send({
        goal: "Practice every day",
        description: "Updated description",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("PATCH /:userId/:hobbyId/progress", () => {
  it("updates hobby progress and returns hobby", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001/progress")
      .send({
        progress: 75,
        note: "Made good progress today",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
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
      },
    });
  });

  it("returns 400 if progress is not a number", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001/progress")
      .send({
        progress: "75",
        note: "Good progress",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if progress is below 0", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001/progress")
      .send({
        progress: -1,
        note: "Invalid progress",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if progress is above 100", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001/progress")
      .send({
        progress: 101,
        note: "Invalid progress",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 400 if note is missing", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_001/progress")
      .send({
        progress: 75,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not exist", async () => {
    const response = await request(app)
      .patch("/api/hobby/user_001/hobby_003/progress")
      .send({
        progress: 75,
        note: "Good progress",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("DELETE /:userId/:hobbyId", () => {
  it("deletes and returns hobby", async () => {
    const response = await request(app).delete("/api/hobby/user_001/hobby_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: "hobby_001",
        userId: "user_001",
      }),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).delete("/api/hobby/user/hobby_001");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not exist", async () => {
    const response = await request(app).delete("/api/hobby/user_001/hobby");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if hobby does not belong to user", async () => {
    const response = await request(app).delete("/api/hobby/user_001/hobby_003");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});
