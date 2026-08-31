import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../../src/app";

describe("GET /:userId/requests", () => {
  it("returns users with incoming requests", async () => {
    const response = await request(app).get("/api/sponsor/user_004/requests");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          createdAt: "2026-07-26T12:00:00.000Z",
          email: "olivia@example.com",
          id: "user_015",
          role: "RECOVERING_USER",
          username: "olivia_recovery",
        },
        {
          createdAt: "2026-07-10T09:15:00.000Z",
          email: "jordan@example.com",
          id: "user_003",
          role: "FAMILY_MEMBER",
          username: "jordan_support",
        },
      ],
    });
  });
});

describe("GET /:userId", () => {
  it("returns sponsor if exists", async () => {
    const response = await request(app).get("/api/sponsor/user_002");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        createdAt: "2026-07-12T16:20:00.000Z",
        email: "morgan@example.com",
        id: "user_004",
        role: "RECOVERING_USER",
        username: "morgan_recovery",
      },
    });
  });

  it("returns null if user sponsor does not exists", async () => {
    const response = await request(app).get("/api/sponsor/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: null,
    });
  });
});

describe("GET /:userId/mentee", () => {
  it("returns array of users which are mentees", async () => {
    const response = await request(app).get("/api/sponsor/user_001/mentee");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      data: [
        {
          createdAt: "2026-07-12T16:20:00.000Z",
          email: "morgan@example.com",
          id: "user_004",
          role: "RECOVERING_USER",
          username: "morgan_recovery",
        },
        {
          createdAt: "2026-07-26T12:00:00.000Z",
          email: "sabrina@example.com",
          id: "user_014",
          role: "RECOVERING_USER",
          username: "sabrina_recovery",
        },
      ],
    });
  });
});

describe("POST /:userId/request", () => {
  it("returns SponsorRequest and adds a user request", async () => {
    const response = await request(app)
      .post("/api/sponsor/user_001/request")
      .send({
        recipientId: "user_002",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "request_015",
        recipientId: "user_002",
        requesterId: "user_001",
        status: "pending",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("conflict if user and recipient are same", async () => {
    const response = await request(app)
      .post("/api/sponsor/user_001/request")
      .send({
        recipientId: "user_001",
      });

    expect(response.status).toBe(409);
  });

  it("if request cannot be posted", async () => {
    const response = await request(app)
      .post("/api/sponsor/user_001/request")
      .send({
        recipientId: "user",
      });

    expect(response.status).toBe(400);
  });
});

describe("PATCH /:userId/requests/accept", () => {
  it("returns SponsorRequest after accepting", async () => {
    const response = await request(app)
      .patch("/api/sponsor/user_001/requests/accept")
      .send({
        requesterId: "user_015",
      });

    expect(response.status).toBe(200);
  });

  it("returns 404 if sponsorRequest is not found", async () => {
    const response = await request(app)
      .patch("/api/sponsor/user_001/requests/accept")
      .send({
        requesterId: "user_001",
      });

    expect(response.status).toBe(404);
  });
});

describe("PATCH /:userId/requests/decline", () => {
  it("returns declined SponsorRequest", async () => {
    const response = await request(app)
      .patch("/api/sponsor/user_004/requests/decline")
      .send({
        requesterId: "user_015",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "request_010",
        requesterId: "user_015",
        recipientId: "user_004",
        status: "rejected",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });
  it("returns 404 if request not found", async () => {
    const response = await request(app)
      .patch("/api/sponsor/user_001/requests/accept")
      .send({
        requesterId: "user_015",
      });

    expect(response.status).toBe(404);
  });
});

describe("GET /:userId/suggestions", () => {
  it("returns sponsor suggestions to users", async () => {
    const response = await request(app).get(
      "/api/sponsor/user_001/suggestions",
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns empty array if user does not exist", async () => {
    const response = await request(app).get("/api/sponsor/user/suggestions");

    expect(response.status).toBe(404);
  });
});
