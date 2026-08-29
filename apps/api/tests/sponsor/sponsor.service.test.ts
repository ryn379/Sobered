import { describe, it, expect, vi, beforeEach } from "vitest";
import { User } from "../../src/features/user/user.mock";
import { findUserByUserId } from "../../src/features/user/user.repository";
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
import {
  acceptReqService,
  declineReqService,
  getMenteeService,
  getReqsService,
  getSponsorService,
  getSuggestionsSponsorService,
  postReqService,
} from "../../src/features/sponsor/sponsor.service";
import { SponsorRequest } from "../../src/features/sponsor/sponsor.mock";

vi.mock("../../src/features/user/user.repository");
vi.mock("../../src/features/sponsor/sponsor.repository");

describe("getSponsorService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns user sponsor if exists", async () => {
    const sponsor: User = {
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    };
    const user: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(sponsor);

    const result = await getSponsorService("user_002");

    expect(result).toEqual(sponsor);
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorByUserId).toHaveBeenCalledWith("user_002");
  });

  it("returns null, user not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getSponsorService("user");

    expect(result).toBeNull();

    expect(findUserByUserId).toHaveBeenCalledWith("user");
  });

  it("returns null, entry not found", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(null);

    const result = await getSponsorService("user_001");

    expect(result).toEqual([]);
  });
});

describe("getReqsService", () => {
  it("returns requests", async () => {
    const user: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };

    const sponsorReqs: User[] = [];

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(getSponsorReqsAllByUserId).mockResolvedValueOnce(sponsorReqs);

    const result = await getReqsService("user_002");

    expect(result).toEqual(sponsorReqs);
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorReqsAllByUserId).toHaveBeenCalledWith("user_002");
  });

  it("return null, user not found", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getReqsService("user");

    expect(result).toEqual([]);
    expect(findUserByUserId).toHaveBeenCalledWith("user");
  });
});

describe("postReqService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("user and recepient are same", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);

    const result = await postReqService("user_001", "user_001");

    expect(result).toBeNull();
  });

  it("requester does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await postReqService("user", "user_001");

    expect(result).toBeNull();
  });

  it("recipient does not exist", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await postReqService("user_001", "user");

    expect(result).toBeNull();
  });

  it("requester has a sponsor so cannot send request", async () => {
    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };

    const recipient: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const sponsor: User = {
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(recipient);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(sponsor);

    const result = await postReqService("user_002", "user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(getSponsorByUserId).toHaveBeenCalledWith("user_002");
  });

  it("existing request already exists", async () => {
    const requester: User = {
      id: "user_003",
      username: "jordan_support",
      email: "jordan@example.com",
      role: "FAMILY_MEMBER",
      createdAt: "2026-07-10T09:15:00.000Z",
    };

    const recipient: User = {
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    };

    const sponsorRequest: SponsorRequest = {
      id: "request_011",
      requesterId: "user_003",
      recipientId: "user_004",
      status: "pending",
      createdAt: "2026-08-18T14:00:00.000Z",
      updatedAt: "2026-08-18T14:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(recipient);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(null);
    vi.mocked(getPendingSponsorRequest).mockResolvedValueOnce(sponsorRequest);

    const result = await postReqService(requester.id, recipient.id);

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(findUserByUserId).toHaveBeenCalledWith("user_004");
    expect(getSponsorByUserId).toHaveBeenCalledWith("user_003");
    expect(getPendingSponsorRequest).toHaveBeenCalledWith(
      "user_003",
      "user_004",
    );
  });

  it("returns a SponsorRequest", async () => {
    const requester: User = {
      id: "user_003",
      username: "jordan_support",
      email: "jordan@example.com",
      role: "FAMILY_MEMBER",
      createdAt: "2026-07-10T09:15:00.000Z",
    };

    const recipient: User = {
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    };

    const sponsorRequest: SponsorRequest = {
      id: "request_011",
      requesterId: "user_003",
      recipientId: "user_004",
      status: "pending",
      createdAt: "2026-08-18T14:00:00.000Z",
      updatedAt: "2026-08-18T14:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(recipient);
    vi.mocked(getSponsorByUserId).mockResolvedValueOnce(null);
    vi.mocked(getPendingSponsorRequest).mockResolvedValueOnce(null);
    vi.mocked(addSponsorRequestByUserId).mockResolvedValueOnce(sponsorRequest);

    const result = await postReqService("user_003", "user_004");

    expect(result).toEqual(sponsorRequest);
    expect(findUserByUserId).toHaveBeenCalledWith("user_003");
    expect(findUserByUserId).toHaveBeenCalledWith("user_004");
    expect(getSponsorByUserId).toHaveBeenCalledWith("user_003");
    expect(getPendingSponsorRequest).toHaveBeenCalledWith(
      "user_003",
      "user_004",
    );
  });
});

describe("acceptReqService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns SponsorRequest", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    const request: SponsorRequest = {
      id: "request_001",
      requesterId: "user_002",
      recipientId: "user_004",
      status: "pending",
      createdAt: "2026-08-05T09:30:00.000Z",
      updatedAt: "2026-08-05T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(request);
    vi.mocked(acceptSponsorRequestByReqId).mockResolvedValueOnce(request);

    const result = await acceptReqService("user_001", "user_002");

    expect(result).toEqual(request);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
    expect(acceptSponsorRequestByReqId("request_001"));
  });

  it("requester does not exist", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await acceptReqService("user_001", "user");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user");
  });

  it("user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);
    const result = await acceptReqService("user", "user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
  });

  it("user and requester is same", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);

    const result = await acceptReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
  });

  it("sponsor request does not exist", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    const request: SponsorRequest = {
      id: "request_001",
      requesterId: "user_002",
      recipientId: "user_004",
      status: "pending",
      createdAt: "2026-08-05T09:30:00.000Z",
      updatedAt: "2026-08-05T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(null);

    const result = await acceptReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
  });

  it("sponsor request is not pending", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    const request: SponsorRequest = {
      id: "request_001",
      requesterId: "user_002",
      recipientId: "user_004",
      status: "accepted",
      createdAt: "2026-08-05T09:30:00.000Z",
      updatedAt: "2026-08-05T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(request);

    const result = await acceptReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
  });
});

describe("declineReq", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns SponsorRequest", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    const request: SponsorRequest = {
      id: "request_001",
      requesterId: "user_002",
      recipientId: "user_004",
      status: "pending",
      createdAt: "2026-08-05T09:30:00.000Z",
      updatedAt: "2026-08-05T10:00:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(request);
    vi.mocked(declineSponsorRequestByReqId).mockResolvedValueOnce(request);

    const result = await declineReqService("user_001", "user_002");

    expect(result).toEqual(request);
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
    expect(declineSponsorRequestByReqId).toHaveBeenCalledWith("request_001");
  });

  it("user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);
    const result = await declineReqService("user", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user");
  });

  it("requester does not exist", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await declineReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
  });

  it("request does not exist", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(null);

    const result = await declineReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
  });

  it("request is not pending", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const requester: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };
    const request: SponsorRequest = {
      id: "request_001",
      requesterId: "user_002",
      recipientId: "user_004",
      status: "accepted",
      createdAt: "2026-08-05T09:30:00.000Z",
      updatedAt: "2026-08-05T10:00:00.000Z",
    };
    vi.mocked(findUserByUserId).mockResolvedValueOnce(user);
    vi.mocked(findUserByUserId).mockResolvedValueOnce(requester);
    vi.mocked(getSponsorRequestByUserId).mockResolvedValueOnce(request);

    const result = await declineReqService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenCalledWith("user_001");
    expect(findUserByUserId).toHaveBeenCalledWith("user_002");
    expect(getSponsorRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
  });
});

describe("getMenteeService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("User Array is returned", async () => {
    const user: User = {
      id: "user_001",
      username: "alex_recovery",
      email: "alex@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-01T10:00:00.000Z",
    };

    const menteeIds = ["user_001", "user_002", "user_003"];

    const mentees: User[] = [
      {
        id: "user_001",
        username: "alex_recovery",
        email: "alex@example.com",
        role: "RECOVERING_USER",
        createdAt: "2026-07-01T10:00:00.000Z",
      },
      {
        id: "user_002",
        username: "sam_recovery",
        email: "sam@example.com",
        role: "RECOVERING_USER",
        createdAt: "2026-07-05T14:30:00.000Z",
      },
      {
        id: "user_003",
        username: "jordan_support",
        email: "jordan@example.com",
        role: "FAMILY_MEMBER",
        createdAt: "2026-07-10T09:15:00.000Z",
      },
    ];

    vi.mocked(getMenteeByUserId).mockResolvedValueOnce(menteeIds);
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(mentees[0])
      .mockResolvedValueOnce(mentees[1])
      .mockResolvedValueOnce(mentees[2]);

    const result = await getMenteeService("user_001");

    expect(result).toEqual(mentees);
  });
});

describe("getSuggestionsSponsorService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns users who do not already have an outgoing request", async () => {
    const users: User[] = [
      {
        id: "user_001",
        username: "alex_recovery",
        email: "alex@example.com",
        role: "RECOVERING_USER",
        createdAt: "2026-07-01T10:00:00.000Z",
      },
      {
        id: "user_002",
        username: "sam_recovery",
        email: "sam@example.com",
        role: "RECOVERING_USER",
        createdAt: "2026-07-05T14:30:00.000Z",
      },
      {
        id: "user_003",
        username: "jordan_support",
        email: "jordan@example.com",
        role: "FAMILY_MEMBER",
        createdAt: "2026-07-10T09:15:00.000Z",
      },
    ];

    const requests: User[] = [users[1]];

    vi.mocked(getRandomUsers).mockResolvedValueOnce(users);

    vi.mocked(getOutgoingSponsorRequestsByUserId).mockResolvedValueOnce(
      requests,
    );

    const result = await getSuggestionsSponsorService("user_001");

    expect(result).toEqual([users[0], users[2]]);

    expect(getRandomUsers).toHaveBeenCalledWith("user_001");

    expect(getOutgoingSponsorRequestsByUserId).toHaveBeenCalledWith("user_001");
  });
});
