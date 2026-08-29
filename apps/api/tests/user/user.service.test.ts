import { describe, it, expect, vi, beforeEach } from "vitest";
import { findUserByUserId } from "../../src/features/user/user.repository";
import { getSponsorByUserId } from "../../src/features/sponsor/sponsor.repository";
import { userFindService } from "../../src/features/user/user.service";
import { User } from "../../src/features/user/user.mock";

vi.mock("../../src/features/user/user.repository.ts");
vi.mock("../../src/features/sponsor/sponsor.repository.ts");

describe("userFindService", async () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns user and sponsor if exists", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const sponsor: User = {
      id: "sponsor_001",
      username: "sponsor",
      email: "sponsor@example.com",
      role: "PROFESSIONAL",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(sponsor);

    const result = await userFindService("user_001");

    expect(result).toEqual({
      user,
      sponsor,
    });
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getSponsorByUserId).toHaveBeenCalledWith("user_001");
  });

  it("returns null is user does not exists", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await userFindService("hi");

    expect(result).toBeNull();

    expect(findUserByUserId).toHaveBeenCalledWith("hi");
  });
});
