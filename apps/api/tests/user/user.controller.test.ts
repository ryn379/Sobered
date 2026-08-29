import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("GET /api/user/:userId", () => {
  it("returns user when user exists and sponsor is null", async () => {
    const response = await request(app).get("/api/user/user_001");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        user: {
          id: "user_001",
          username: "alex_recovery",
          email: "alex@example.com",
          role: "RECOVERING_USER",
          createdAt: "2026-07-01T10:00:00.000Z",
        },
        sponsor: null,
      },
    });
  });

  it("returns user when user exists and sponsor also exists", async () => {
    const response = await request(app).get("/api/user/user_002");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      data: {
        user: {
          id: "user_002",
          username: "sam_recovery",
          email: "sam@example.com",
          role: "RECOVERING_USER",
          createdAt: "2026-07-05T14:30:00.000Z",
        },
        sponsor: {
          id: "user_004",
          username: "morgan_recovery",
          email: "morgan@example.com",
          role: "RECOVERING_USER",
          createdAt: "2026-07-12T16:20:00.000Z",
        },
      },
    });
  });

  it("User does not exist", async () => {
    const response = await request(app).get("/api/user/no");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      success: false,
      message: "User Not Found",
    });
  });
});
