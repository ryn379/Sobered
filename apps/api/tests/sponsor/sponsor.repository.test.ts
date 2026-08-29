import { describe, expect, it } from "vitest";
import {
  acceptSponsorRequestByReqId,
  addSponsorRelationship,
  addSponsorRequestByUserId,
  declineSponsorRequestByReqId,
  getMenteeByUserId,
  getOutgoingSponsorRequestsByUserId,
  getPendingSponsorRequest,
  getRandomUsers,
  getSponsorByUserId,
  getSponsorReqsAllByUserId,
  getSponsorRequestByUserId,
} from "../../src/features/sponsor/sponsor.repository";

describe("getSponsorByUserId", async () => {
  it("returns sponsor by user ID", async () => {
    const result = await getSponsorByUserId("user_002");

    expect(result).toEqual({
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    });
  });

  it("returns null if sponsor does not exist", async () => {
    const result = await getSponsorByUserId("user_001");

    expect(result).toBeNull();
  });
});

describe("getMenteeByUserId", async () => {
  it("returns mentee userIds", async () => {
    const result = await getMenteeByUserId("user_001");

    expect(result).toEqual(["user_004", "user_014"]);
  });
});

describe("getSponsorReqsAllByUserId", async () => {
  it("returns user array of all incoming sponsor requests", async () => {
    const result = await getSponsorReqsAllByUserId("user_001");

    expect(result).toEqual([]);
  });
});

describe("addSponsorRequestByUserId", async () => {
  it("returns SponsorRequest and adds a request", async () => {
    const result = await addSponsorRequestByUserId("user_001", "user_002");

    expect(result).toEqual({
      id: `request_015`,
      requesterId: "user_001",
      recipientId: "user_002",
      status: "pending",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe("acceptSponsorRequestByUserId", async () => {
  it("returns SponsorRequest after acceping request", async () => {
    const result = await acceptSponsorRequestByReqId("request_014");

    expect(result).toEqual({
      id: "request_014",
      recipientId: "user_012",
      requesterId: "user_015",
      status: "accepted",
      createdAt: "2026-08-13T16:00:00.000Z",
      updatedAt: expect.any(String),
    });
  });
});

describe("declineSponsorRequestByReqId", async () => {
  it("returns SponsorRequest and rejects requesr", async () => {
    const result = await declineSponsorRequestByReqId("request_014");

    expect(result).toEqual({
      id: "request_014",
      recipientId: "user_012",
      requesterId: "user_015",
      status: "rejected",
      createdAt: "2026-08-13T16:00:00.000Z",
      updatedAt: expect.any(String),
    });
  });
});

describe("addSponsorRelationship", async () => {
  it("returns Sponsor and adds as sponsor", async () => {
    const result = await addSponsorRelationship("user_001", "user_002");

    expect(result).toEqual({
      id: `sponsor_009`,
      sponsorId: "user_002",
      menteeId: "user_001",
      createdAt: expect.any(String),
    });
  });
});

describe("getSponsorRequestByUserId", async () => {
  it("returns null when request not found", async () => {
    const result = await getSponsorRequestByUserId("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("returns SponsorRequest when request exists", async () => {
    const result = await getSponsorRequestByUserId("user_001", "user_003");

    expect(result).toEqual({
      id: "request_003",
      recipientId: "user_001",
      requesterId: "user_003",
      status: "rejected",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe("getPendingSponsorRequest", async () => {
  it("returns null when request not found", async () => {
    const result = await getPendingSponsorRequest("user_001", "user_004");

    expect(result).toBeNull();
  });

  it("returns SponsorRequest when request found", async () => {
    const result = await getPendingSponsorRequest("user_001", "user_002");

    expect(result).toEqual({
      id: "request_015",
      recipientId: "user_002",
      requesterId: "user_001",
      status: "pending",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

describe("getRandomUsers", async () => {
  it("does not return the user", async () => {
    const result = await getRandomUsers("user_001");

    expect(result.every((user) => user.id !== "user_001")).toBe(true);
  });

  it("returns at most 10 users", async () => {
    const result = await getRandomUsers("user_001");

    expect(result.length).toBeLessThanOrEqual(10);
  });
});

describe("getOutgoingSponsorRequestsByUserId", async () => {
  it("returns requests of user", async () => {
    const result = await getOutgoingSponsorRequestsByUserId("user_001");

    expect(result).toEqual([
      {
        id: "user_002",
        username: "sam_recovery",
        email: "sam@example.com",
        role: "RECOVERING_USER",
        createdAt: "2026-07-05T14:30:00.000Z",
      },
    ]);
  });

  it("does not return user itself", async () => {
    const result = await getOutgoingSponsorRequestsByUserId("user_001");

    expect(result.every((user) => user.id !== "user_001" && user !== null));
  });
});
