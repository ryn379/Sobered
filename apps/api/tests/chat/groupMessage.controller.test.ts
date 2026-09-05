import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { groupMessages } from "../../src/features/group/chat/groupMessage.mock";
import app from "../../src/app.ts";

const initialMessages = structuredClone(groupMessages);

beforeEach(() => {
  groupMessages.length = 0;
  groupMessages.push(...structuredClone(initialMessages));
});

describe("GET /:userId/:groupId/messages", () => {
  it("returns GroupMessages[]", async () => {
    const response = await request(app).get(
      "/api/chat/user_001/group_001/messages",
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
    });
  });

  it("returns 403 if unauthorized", async () => {
    const response = await request(app).get(
      "/api/chat/user_003/group_001/messages",
    );

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});

describe("POST /:userId/:groupId/messages", () => {
  it("returns GroupMessage that is posted", async () => {
    const response = await request(app)
      .post("/api/chat/user_001/group_001/messages")
      .send({
        content: "this shit cool man, yo",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: expect.any(String),
        groupId: expect.any(String),
        userId: expect.any(String),
        content: expect.any(String),
        createdAt: expect.any(String),
      }),
    });
  });

  it("returns 403 if user unauthorized", async () => {
    const response = await request(app)
      .post("/api/chat/user_003/group_001/messages")
      .send({
        content: "this shit cool man, yo",
      });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      success: false,
      message: expect.any(String),
    });
  });
});
