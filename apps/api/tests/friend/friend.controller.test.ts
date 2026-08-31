import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../../src/app.ts";

import {
  friendships,
  friendRequests,
} from "../../src/features/friend/friend.mock.ts";

const initialFriendships = structuredClone(friendships);
const initialFriendRequests = structuredClone(friendRequests);

beforeEach(() => {
  friendships.length = 0;
  friendships.push(...structuredClone(initialFriendships));

  friendRequests.length = 0;
  friendRequests.push(...structuredClone(initialFriendRequests));
});

describe("GET /:userId", () => {
  it("returns friends of user", async () => {
    const response = await request(app).get("/api/friend/user_001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns empty array if user has no friends", async () => {
    const response = await request(app).get("/api/friend/user_006");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });
});

describe("GET /:userId/requests", () => {
  it("returns pending friend requests", async () => {
    const response = await request(app).get("/api/friend/user_001/requests");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns empty array if there are no pending requests", async () => {
    const response = await request(app).get("/api/friend/user_003/requests");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });
});

describe("POST /:userId/request", () => {
  it("creates a friend request", async () => {
    const response = await request(app)
      .post("/api/friend/user_001/request")
      .send({
        recipientId: "user_012",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: expect.any(String),
        requesterId: "user_001",
        recipientId: "user_012",
        status: "PENDING",
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 400 if user sends request to themselves", async () => {
    const response = await request(app)
      .post("/api/friend/user_001/request")
      .send({
        recipientId: "user_001",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Failed",
    });
  });

  it("returns 400 if recipient does not exist", async () => {
    const response = await request(app)
      .post("/api/friend/user_001/request")
      .send({
        recipientId: "user_999",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Failed",
    });
  });

  it("returns 400 if recipient is already a friend", async () => {
    const response = await request(app)
      .post("/api/friend/user_001/request")
      .send({
        recipientId: "user_002",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Failed",
    });
  });

  it("returns 400 if request already exists", async () => {
    const response = await request(app)
      .post("/api/friend/user_001/request")
      .send({
        recipientId: "user_007",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: "Request Failed",
    });
  });
});

describe("PATCH /:userId/accept", () => {
  it("accepts a friend request", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/accept")
      .send({
        requesterId: "user_005",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "friend_request_002",
        requesterId: "user_005",
        recipientId: "user_001",
        status: "ACCEPTED",
        createdAt: "2026-08-12T14:00:00.000Z",
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 404 if requester does not exist", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/accept")
      .send({
        requesterId: "user_999",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User or Request Not Found",
    });
  });

  it("returns 404 if friend request does not exist", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/accept")
      .send({
        requesterId: "user_012",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User or Request Not Found",
    });
  });

  it("returns 404 if user accepts their own request", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/accept")
      .send({
        requesterId: "user_001",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User or Request Not Found",
    });
  });
});

describe("PATCH /:userId/decline", () => {
  it("declines a friend request", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/decline")
      .send({
        requesterId: "user_005",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "friend_request_002",
        requesterId: "user_005",
        recipientId: "user_001",
        status: "DECLINED",
        createdAt: "2026-08-12T14:00:00.000Z",
        updatedAt: expect.any(String),
      },
    });
  });

  it("returns 404 if requester does not exist", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/decline")
      .send({
        requesterId: "user_999",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User or Request Not Found",
    });
  });

  it("returns 404 if friend request does not exist", async () => {
    const response = await request(app)
      .patch("/api/friend/user_001/decline")
      .send({
        requesterId: "user_012",
      });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "User or Request Not Found",
    });
  });
});

describe("DELETE /:userId/:friendId", () => {
  it("deletes a friendship", async () => {
    const response = await request(app).delete("/api/friend/user_001/user_002");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        id: "friendship_001",
        userId: "user_001",
        friendId: "user_002",
        status: "REVOKED",
        createdAt: "2026-07-15T10:00:00.000Z",
      },
    });
  });

  it("returns 404 if user does not exist", async () => {
    const response = await request(app).delete("/api/friend/user_999/user_002");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Users Not Found",
    });
  });

  it("returns 404 if friend does not exist", async () => {
    const response = await request(app).delete("/api/friend/user_001/user_999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Users Not Found",
    });
  });

  it("returns 404 if users are not friends", async () => {
    const response = await request(app).delete("/api/friend/user_001/user_005");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Users Not Found",
    });
  });
});

describe("GET /:userId/suggestion", () => {
  it("returns friend suggestions", async () => {
    const response = await request(app).get("/api/friend/user_001/suggestion");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns empty array if user does not exist", async () => {
    const response = await request(app).get("/api/friend/user_999/suggestion");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [],
    });
  });
});
