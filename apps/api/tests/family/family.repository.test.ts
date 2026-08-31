import { describe, expect, it } from "vitest";
import {
  getFamilyByUserId,
  getRecovererByFamilyUserId,
} from "../../src/features/family/family.repository.ts";

describe("getFamilyByUserId", () => {
  it("returns connected family members of recovering user", async () => {
    const result = await getFamilyByUserId("user_001");

    expect(result.map((user) => user.id)).toEqual(["user_003"]);
  });

  it("returns empty array if user has no connected family members", async () => {
    const result = await getFamilyByUserId("user_999");

    expect(result).toEqual([]);
  });
});

describe("getRecovererByFamilyUserId", () => {
  it("returns connected recovering users of family member", async () => {
    const result = await getRecovererByFamilyUserId("user_003");

    expect(result.map((user) => user.id)).toEqual([
      "user_001",
      "user_005",
      "user_007",
      "user_009",
      "user_011",
    ]);
  });

  it("returns empty array if family member has no connected recovering users", async () => {
    const result = await getRecovererByFamilyUserId("user_999");

    expect(result).toEqual([]);
  });
});
