import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../../src/app.ts";
import { diaryEntries } from "../../src/features/diary/diary.mock.ts";

const initialDiaries = structuredClone(diaryEntries);

beforeEach(() => {
  diaryEntries.length = 0;
  diaryEntries.push(...structuredClone(initialDiaries));
});

describe("GET /:userId", () => {
  it("returns DiaryEntries of user", async () => {
    const response = await request(app).get("/api/diary/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns false if user does not exist", async () => {
    const response = await request(app).get("/api/diary/user");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("POST :/userId", () => {
  it("posts a DiaryEntry and returns it", async () => {
    const response = await request(app).post("/api/diary/user_001").send({
      content: "hello this is a post",
      title: "New",
      mood: ";(",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        content: "hello this is a post",
        createdAt: expect.any(String),
        id: "diary_021",
        mood: ";(",
        title: "New",
        updatedAt: expect.any(String),
        userId: "user_001",
      },
    });
  });

  it("returns 404 if user not found", async () => {
    const response = await request(app).post("/api/diary/user").send({
      content: "hello this is a post",
      title: "New",
      mood: ";(",
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/:entryId", () => {
  it("returns DiaryEntry of user", async () => {
    const response = await request(app).get("/api/diary/user_001/diary_001");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        content:
          "This week was difficult, but I managed to attend two meetings and talk to my sponsor.",
        createdAt: expect.any(String),
        id: "diary_001",
        mood: "anxious",
        title: "First difficult week",
        updatedAt: expect.any(String),
        userId: "user_001",
      },
    });
  });

  it("returns null if user not found", async () => {
    const response = await request(app).get("/api/diary/user/diary_001");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary not found", async () => {
    const response = await request(app).get("/api/diary/user_001/diary");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary is not of user", async () => {
    const response = await request(app).get("/api/diary/user_001/diary_003");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("PATCH /:userId/:entryId", () => {
  it("returns updated diary", async () => {
    const response = await request(app)
      .patch("/api/diary/user_001/diary_001")
      .send({
        content: "this is updated",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        content: "this is updated",
        createdAt: expect.any(String),
        id: "diary_001",
        mood: "anxious",
        title: "First difficult week",
        updatedAt: expect.any(String),
        userId: "user_001",
      },
    });
  });

  it("returns null if user not found", async () => {
    const response = await request(app)
      .patch("/api/diary/user/diary_001")
      .send({
        content: "this is updated",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary not found", async () => {
    const response = await request(app)
      .patch("/api/diary/user_001/diary")
      .send({
        content: "this is updated",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary is not of user", async () => {
    const response = await request(app)
      .patch("/api/diary/user_001/diary_003")
      .send({
        content: "this is updated",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("DELETE /:userId/:entryId", () => {
  it("returns null if user not found", async () => {
    const response = await request(app).delete("/api/diary/user/diary_001");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary not found", async () => {
    const response = await request(app).delete("/api/diary/user_001/diary");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns null if diary is not of user", async () => {
    const response = await request(app).delete("/api/diary/user_001/diary_003");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns DiaryEntry if diary deletion successful", async () => {
    const response = await request(app).delete("/api/diary/user_001/diary_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        content:
          "This week was difficult, but I managed to attend two meetings and talk to my sponsor.",
        createdAt: expect.any(String),
        id: "diary_001",
        mood: "anxious",
        title: "First difficult week",
        updatedAt: expect.any(String),
        userId: "user_001",
      },
    });
  });
});
