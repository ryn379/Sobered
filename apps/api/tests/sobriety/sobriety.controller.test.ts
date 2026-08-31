import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../../src/app.ts";
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

describe("GET /:userId", () => {
  it("returns Sobriety of user", async () => {
    const response = await request(app).get("/api/sobriety/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: expect.any(String),
        userId: "user_001",
        startDate: expect.any(String),
        longestStreak: expect.any(Number),
        totalMeetings: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).get("/api/sobriety/user");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("POST /:userId", () => {
  it("changes Sobriety and returns it", async () => {
    const response = await request(app).post("/api/sobriety/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: expect.any(String),
        userId: "user_001",
        startDate: expect.any(String),
        longestStreak: expect.any(Number),
        totalMeetings: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).post("/api/sobriety/user");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/stats", () => {
  it("returns SobrietyStats of user", async () => {
    const response = await request(app).get("/api/sobriety/user_001/stats");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        currentStreak: expect.any(Number),
        longestStreak: expect.any(Number),
        totalDaysSober: expect.any(Number),
        totalSobrietyPeriods: expect.any(Number),
        totalMeetings: expect.any(Number),
        startDate: expect.any(String),
      },
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).get("/api/sobriety/user/stats");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/history", () => {
  it("returns SobrietyHistory of user", async () => {
    const response = await request(app).get("/api/sobriety/user_001/history");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns 400 if user does not exist", async () => {
    const response = await request(app).get("/api/sobriety/user/history");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});
