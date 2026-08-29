import { describe, it, expect } from "vitest";
import { findUserByUserId } from "../../src/features/user/user.repository";

describe("findUserByUserId", () => {
  it("returns user when user exists", async () => {
    const result = await findUserByUserId("user_001");

    expect(result).toEqual({
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    });
  });

  it("returns null when user does not exist", async () => {
    const result = await findUserByUserId("no");

    expect(result).toBeNull();
  });
});
