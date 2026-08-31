import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../../src/app.ts";

describe("GET /:userId", () => {
  it("returns family members of recovering user", async () => {
    const response = await request(app).get("/api/family/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [
        {
          id: "user_003",
          username: "jordan_support",
          email: "jordan@example.com",
          role: "FAMILY_MEMBER",
          createdAt: "2026-07-10T09:15:00.000Z",
        },
      ],
    });
  });

  it("returns empty array if user has no connected family", async () => {
    const response = await request(app).get("/api/family/user_013");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [],
    });
  });

  it("returns 400 if user does not exist", async () => {
    const response = await request(app).get("/api/family/user");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/recoverer", () => {
  it("returns recovering users of family member", async () => {
    const response = await request(app).get("/api/family/user_003/recoverer");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [
        {
          id: "user_001",
          username: "alex_recovery",
          email: "alex@example.com",
          role: "RECOVERING_USER",
          createdAt: "2026-07-01T10:00:00.000Z",
        },
        {
          id: "user_005",
          username: expect.any(String),
          email: expect.any(String),
          role: "RECOVERING_USER",
          createdAt: expect.any(String),
        },
        {
          id: "user_007",
          username: expect.any(String),
          email: expect.any(String),
          role: "RECOVERING_USER",
          createdAt: expect.any(String),
        },
        {
          id: "user_009",
          username: expect.any(String),
          email: expect.any(String),
          role: "RECOVERING_USER",
          createdAt: expect.any(String),
        },
        {
          id: "user_011",
          username: expect.any(String),
          email: expect.any(String),
          role: "RECOVERING_USER",
          createdAt: expect.any(String),
        },
      ],
    });
  });

  it("returns empty array if family member has no connected recovering users", async () => {
    const response = await request(app).get("/api/family/user_999/recoverer");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 400 if user is not a family member", async () => {
    const response = await request(app).get("/api/family/user_001/recoverer");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("GET /:userId/:recovererId/sobriety", () => {
  it("returns sobriety stats if user is family of recoverer", async () => {
    const response = await request(app).get(
      "/api/family/user_003/user_001/sobriety",
    );

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

  it("returns 404 if family relationship does not exist", async () => {
    const response = await request(app).get(
      "/api/family/user_006/user_001/sobriety",
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).get(
      "/api/family/user_999/user_001/sobriety",
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });

  it("returns 404 if recoverer does not exist", async () => {
    const response = await request(app).get(
      "/api/family/user_003/user_999/sobriety",
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});
