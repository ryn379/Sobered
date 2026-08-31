import { describe, it, expect, beforeEach } from "vitest";

import {
  getFriendAllByUserId,
  getUsersFromFriendships,
  getFriendRequestsByUserId,
  getUsersFromFriendRequests,
  postRequestFromUserId,
  deleteFriendByUserId,
  acceptFriendRequestByUserId,
  addFriendship,
  declineFriendRequestByUserId,
  getSentFriendRequestsByUserId,
} from "../../src/features/friend/friend.repository.ts";

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

describe("getFriendAllByUserId", () => {
  it("returns all friendships involving user", async () => {
    const result = await getFriendAllByUserId("user_001");

    expect(result).toEqual(
      initialFriendships.filter(
        (e) => e.userId === "user_001" || e.friendId === "user_001",
      ),
    );
  });

  it("returns empty array if user has no friendships", async () => {
    const result = await getFriendAllByUserId("user_999");

    expect(result).toEqual([]);
  });
});

describe("getUsersFromFriendships", () => {
  it("returns users from friendships", async () => {
    const friendshipsResult = await getFriendAllByUserId("user_001");

    const result = await getUsersFromFriendships("user_001", friendshipsResult);

    expect(result).toEqual(expect.any(Array));
    expect(result.every((user) => user.id !== "user_001")).toBe(true);
  });

  it("returns empty array if friendships are empty", async () => {
    const result = await getUsersFromFriendships("user_001", []);

    expect(result).toEqual([]);
  });
});

describe("getFriendRequestsByUserId", () => {
  it("returns pending incoming friend requests", async () => {
    const result = await getFriendRequestsByUserId("user_001");

    expect(result).toEqual(
      initialFriendRequests.filter(
        (e) => e.recipientId === "user_001" && e.status === "PENDING",
      ),
    );
  });

  it("does not return accepted or declined requests", async () => {
    const result = await getFriendRequestsByUserId("user_001");

    expect(result.every((request) => request.status === "PENDING")).toBe(true);
  });

  it("returns empty array if there are no pending requests", async () => {
    const result = await getFriendRequestsByUserId("user_999");

    expect(result).toEqual([]);
  });
});

describe("getUsersFromFriendRequests", () => {
  it("returns users who sent the requests", async () => {
    const requests = await getFriendRequestsByUserId("user_001");

    const result = await getUsersFromFriendRequests(requests);

    expect(result).toEqual(expect.any(Array));
    expect(
      result.every((user) =>
        requests.some((request) => request.requesterId === user.id),
      ),
    ).toBe(true);
  });

  it("returns empty array if requests are empty", async () => {
    const result = await getUsersFromFriendRequests([]);

    expect(result).toEqual([]);
  });
});

describe("postRequestFromUserId", () => {
  it("creates and returns a new friend request", async () => {
    const result = await postRequestFromUserId("user_001", "user_002");

    expect(result).toEqual({
      id: expect.any(String),
      requesterId: "user_001",
      recipientId: "user_002",
      status: "PENDING",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    const savedRequest = friendRequests.find(
      (request) => request.id === result.id,
    );
    expect(savedRequest).toEqual(result);
  });
});

describe("deleteFriendByUserId", () => {
  it("deletes and returns friendship if it exists", async () => {
    const existingFriendship = initialFriendships.find(
      (friendship) =>
        (friendship.userId === "user_001" &&
          friendship.friendId === "user_002") ||
        (friendship.userId === "user_002" &&
          friendship.friendId === "user_001"),
    );

    if (!existingFriendship) {
      throw new Error("Test setup error: friendship does not exist");
    }

    const result = await deleteFriendByUserId("user_001", "user_002");

    expect(result).toEqual({
      ...existingFriendship,
      status: "REVOKED",
    });

    const deletedFriendship = friendships.find(
      (friendship) => friendship.id === existingFriendship.id,
    );
    expect(deletedFriendship).toBeUndefined();
  });

  it("returns null if friendship does not exist", async () => {
    const result = await deleteFriendByUserId("user_001", "user_999");

    expect(result).toBeNull();
  });
});

describe("acceptFriendRequestByUserId", () => {
  it("accepts a pending friend request", async () => {
    const pendingRequest = initialFriendRequests.find(
      (request) =>
        request.recipientId === "user_001" && request.status === "PENDING",
    );

    if (!pendingRequest) {
      throw new Error(
        "Test setup error: pending friend request does not exist",
      );
    }

    const result = await acceptFriendRequestByUserId(
      pendingRequest.recipientId,
      pendingRequest.requesterId,
    );

    const savedRequest = friendRequests.find(
      (request) => request.id === pendingRequest.id,
    );
    expect(result).toEqual({
      ...pendingRequest,
      status: "ACCEPTED",
      updatedAt: expect.any(String),
    });
    expect(savedRequest?.status).toBe("ACCEPTED");
  });

  it("returns null if request does not exist", async () => {
    const result = await acceptFriendRequestByUserId("user_001", "user_999");

    expect(result).toBeNull();
  });

  it("returns null if request is not pending", async () => {
    const existingRequest = initialFriendRequests.find(
      (request) =>
        request.recipientId === "user_001" && request.status !== "PENDING",
    );

    if (!existingRequest) {
      throw new Error("Test setup error: non-pending request does not exist");
    }

    const result = await acceptFriendRequestByUserId(
      existingRequest.recipientId,
      existingRequest.requesterId,
    );

    expect(result).toBeNull();
  });
});

describe("addFriendship", () => {
  it("creates and returns a new friendship", async () => {
    const result = await addFriendship("user_001", "user_002");

    expect(result).toEqual({
      id: expect.any(String),
      userId: "user_001",
      friendId: "user_002",
      status: "ACCEPTED",
      createdAt: expect.any(String),
    });

    const savedFriendship = friendships.find(
      (friendship) => friendship.id === result.id,
    );
    expect(savedFriendship).toEqual(result);
  });
});

describe("declineFriendRequestByUserId", () => {
  it("declines a pending friend request", async () => {
    const pendingRequest = initialFriendRequests.find(
      (request) =>
        request.recipientId === "user_001" && request.status === "PENDING",
    );

    if (!pendingRequest) {
      throw new Error(
        "Test setup error: pending friend request does not exist",
      );
    }

    const result = await declineFriendRequestByUserId(
      pendingRequest.recipientId,
      pendingRequest.requesterId,
    );

    const savedRequest = friendRequests.find(
      (request) => request.id === pendingRequest.id,
    );
    expect(result).toEqual({
      ...pendingRequest,
      status: "DECLINED",
      updatedAt: expect.any(String),
    });
    expect(savedRequest?.status).toBe("DECLINED");
  });

  it("returns null if request does not exist", async () => {
    const result = await declineFriendRequestByUserId("user_001", "user_999");

    expect(result).toBeNull();
  });

  it("returns null if request is not pending", async () => {
    const existingRequest = initialFriendRequests.find(
      (request) =>
        request.recipientId === "user_001" && request.status !== "PENDING",
    );

    if (!existingRequest) {
      throw new Error("Test setup error: non-pending request does not exist");
    }

    const result = await declineFriendRequestByUserId(
      existingRequest.recipientId,
      existingRequest.requesterId,
    );

    expect(result).toBeNull();
  });
});

describe("getSentFriendRequestsByUserId", () => {
  it("returns pending outgoing requests", async () => {
    const result = await getSentFriendRequestsByUserId("user_001");

    expect(result).toEqual(
      initialFriendRequests.filter(
        (request) =>
          request.requesterId === "user_001" && request.status === "PENDING",
      ),
    );
  });

  it("returns empty array if user has no pending outgoing requests", async () => {
    const result = await getSentFriendRequestsByUserId("user_999");

    expect(result).toEqual([]);
  });

  it("does not return accepted or declined requests", async () => {
    const result = await getSentFriendRequestsByUserId("user_001");

    expect(result.every((request) => request.status === "PENDING")).toBe(true);
  });
});
