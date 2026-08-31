import { describe, it, expect, vi, beforeEach } from "vitest";

import {
  getFriendsService,
  getFriendRequestService,
  postFriendRequestService,
  deleteFriendService,
  acceptFriendService,
  declineFriendService,
  getSuggestionFriendsService,
} from "../../src/features/friend/friend.service.ts";

import {
  getFriendAllByUserId,
  getFriendRequestsByUserId,
  getSentFriendRequestsByUserId,
  getUsersFromFriendRequests,
  getUsersFromFriendships,
  postRequestFromUserId,
  deleteFriendByUserId,
  acceptFriendRequestByUserId,
  addFriendship,
  declineFriendRequestByUserId,
} from "../../src/features/friend/friend.repository.ts";

import { findUserByUserId } from "../../src/features/user/user.repository.ts";

import type {
  Friend,
  FriendRequest,
} from "../../src/features/friend/friend.mock.ts";

import type { User } from "../../src/features/user/user.mock.ts";

vi.mock("../../src/features/friend/friend.repository.ts");
vi.mock("../../src/features/user/user.repository.ts");

beforeEach(() => {
  vi.resetAllMocks();
});

const recoveringUser: User = {
  id: "user_001",
  username: "alex_recovery",
  email: "alex@example.com",
  role: "RECOVERING_USER",
  createdAt: "2026-07-01T10:00:00.000Z",
};

const recoveringUser2: User = {
  id: "user_002",
  username: "sam_recovery",
  email: "sam@example.com",
  role: "RECOVERING_USER",
  createdAt: "2026-07-05T14:30:00.000Z",
};

const familyUser: User = {
  id: "user_003",
  username: "jordan_support",
  email: "jordan@example.com",
  role: "FAMILY_MEMBER",
  createdAt: "2026-07-10T09:15:00.000Z",
};

const friend: Friend = {
  id: "friendship_001",
  userId: "user_001",
  friendId: "user_002",
  status: "ACCEPTED",
  createdAt: "2026-07-15T10:00:00.000Z",
};

const pendingRequest: FriendRequest = {
  id: "friend_request001",
  requesterId: "user_002",
  recipientId: "user_001",
  status: "PENDING",
  createdAt: "2026-07-15T10:00:00.000Z",
  updatedAt: "2026-07-15T10:00:00.000Z",
};

describe("getFriendsService", () => {
  it("returns users who are friends", async () => {
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([friend]);
    vi.mocked(getUsersFromFriendships).mockResolvedValueOnce([recoveringUser2]);

    const result = await getFriendsService("user_001");

    expect(result).toEqual([recoveringUser2]);
    expect(getFriendAllByUserId).toHaveBeenCalledWith("user_001");
    expect(getUsersFromFriendships).toHaveBeenCalledWith("user_001", [friend]);
  });
});

describe("getFriendRequestService", () => {
  it("returns users who sent friend requests", async () => {
    vi.mocked(getFriendRequestsByUserId).mockResolvedValueOnce([
      pendingRequest,
    ]);
    vi.mocked(getUsersFromFriendRequests).mockResolvedValueOnce([
      recoveringUser2,
    ]);

    const result = await getFriendRequestService("user_001");

    expect(result).toEqual([recoveringUser2]);
    expect(getFriendRequestsByUserId).toHaveBeenCalledWith("user_001");
    expect(getUsersFromFriendRequests).toHaveBeenCalledWith([pendingRequest]);
  });
});

describe("postFriendRequestService", () => {
  it("returns null if user sends request to themselves", async () => {
    const result = await postFriendRequestService("user_001", "user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).not.toHaveBeenCalled();
  });

  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(recoveringUser2);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toBeNull();
    expect(findUserByUserId).toHaveBeenNthCalledWith(1, "user_001");
    expect(findUserByUserId).toHaveBeenNthCalledWith(2, "user_002");
  });

  it("returns null if recipient does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(null);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("returns null if users have different roles", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(familyUser);

    const result = await postFriendRequestService("user_001", "user_003");

    expect(result).toBeNull();

    expect(getFriendAllByUserId).not.toHaveBeenCalled();
    expect(postRequestFromUserId).not.toHaveBeenCalled();
  });

  it("returns null if users are already friends", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([friend]);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toBeNull();

    expect(postRequestFromUserId).not.toHaveBeenCalled();
  });

  it("returns null if an incoming request already exists", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);

    vi.mocked(getFriendRequestsByUserId).mockResolvedValueOnce([
      pendingRequest,
    ]);

    vi.mocked(getSentFriendRequestsByUserId).mockResolvedValueOnce([]);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toBeNull();

    expect(postRequestFromUserId).not.toHaveBeenCalled();
  });

  it("returns null if an outgoing request already exists", async () => {
    const outgoingRequest: FriendRequest = {
      id: "friend_request002",
      requesterId: "user_001",
      recipientId: "user_002",
      status: "PENDING",
      createdAt: "2026-07-15T10:00:00.000Z",
      updatedAt: "2026-07-15T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);

    vi.mocked(getFriendRequestsByUserId).mockResolvedValueOnce([]);

    vi.mocked(getSentFriendRequestsByUserId).mockResolvedValueOnce([
      outgoingRequest,
    ]);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toBeNull();

    expect(postRequestFromUserId).not.toHaveBeenCalled();
  });

  it("creates and returns a friend request", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);

    vi.mocked(getFriendRequestsByUserId).mockResolvedValueOnce([]);

    vi.mocked(getSentFriendRequestsByUserId).mockResolvedValueOnce([]);

    vi.mocked(postRequestFromUserId).mockResolvedValueOnce(pendingRequest);

    const result = await postFriendRequestService("user_001", "user_002");

    expect(result).toEqual(pendingRequest);

    expect(postRequestFromUserId).toHaveBeenCalledWith("user_001", "user_002");
  });
});

describe("deleteFriendService", () => {
  it("returns null if user does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(recoveringUser2);

    const result = await deleteFriendService("user_001", "user_002");

    expect(result).toBeNull();
    expect(getFriendAllByUserId).not.toHaveBeenCalled();
  });

  it("returns null if friend does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(null);

    const result = await deleteFriendService("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("returns null if users are not friends", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);

    const result = await deleteFriendService("user_001", "user_002");

    expect(result).toBeNull();
    expect(deleteFriendByUserId).not.toHaveBeenCalled();
  });

  it("deletes and returns friendship", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([friend]);
    vi.mocked(deleteFriendByUserId).mockResolvedValueOnce(friend);

    const result = await deleteFriendService("user_001", "user_002");

    expect(result).toEqual(friend);
    expect(deleteFriendByUserId).toHaveBeenCalledWith("user_001", "user_002");
  });
});

describe("acceptFriendService", () => {
  it("returns null if users are the same", async () => {
    const result = await acceptFriendService("user_001", "user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).not.toHaveBeenCalled();
  });

  it("returns null if user or requester does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(recoveringUser2);

    const result = await acceptFriendService("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("returns null if users are already friends", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);

    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([friend]);

    const result = await acceptFriendService("user_001", "user_002");

    expect(result).toBeNull();
    expect(acceptFriendRequestByUserId).not.toHaveBeenCalled();
  });

  it("returns null if friend request does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);
    vi.mocked(acceptFriendRequestByUserId).mockResolvedValueOnce(null);

    const result = await acceptFriendService("user_001", "user_002");

    expect(result).toBeNull();
    expect(addFriendship).not.toHaveBeenCalled();
  });

  it("accepts request and creates friendship", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);
    vi.mocked(acceptFriendRequestByUserId).mockResolvedValueOnce(
      pendingRequest,
    );
    vi.mocked(addFriendship).mockResolvedValueOnce(friend);

    const result = await acceptFriendService("user_001", "user_002");

    expect(result).toEqual(pendingRequest);
    expect(acceptFriendRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
    expect(addFriendship).toHaveBeenCalledWith("user_001", "user_002");
  });
});

describe("declineFriendService", () => {
  it("returns null if users are the same", async () => {
    const result = await declineFriendService("user_001", "user_001");

    expect(result).toBeNull();
    expect(findUserByUserId).not.toHaveBeenCalled();
  });

  it("returns null if user or requester does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(recoveringUser2);

    const result = await declineFriendService("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("returns null if users are already friends", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([friend]);

    const result = await declineFriendService("user_001", "user_002");

    expect(result).toBeNull();
    expect(declineFriendRequestByUserId).not.toHaveBeenCalled();
  });

  it("returns null if friend request does not exist", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);
    vi.mocked(declineFriendRequestByUserId).mockResolvedValueOnce(null);

    const result = await declineFriendService("user_001", "user_002");

    expect(result).toBeNull();
  });

  it("declines and returns friend request", async () => {
    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(recoveringUser2);
    vi.mocked(getFriendAllByUserId).mockResolvedValueOnce([]);
    vi.mocked(declineFriendRequestByUserId).mockResolvedValueOnce(
      pendingRequest,
    );

    const result = await declineFriendService("user_001", "user_002");

    expect(result).toEqual(pendingRequest);
    expect(declineFriendRequestByUserId).toHaveBeenCalledWith(
      "user_001",
      "user_002",
    );
  });
});

describe("getSuggestionFriendsService", () => {
  it("returns empty array if user does not exist", async () => {
    vi.mocked(findUserByUserId).mockResolvedValueOnce(null);

    const result = await getSuggestionFriendsService("user_001");

    expect(result).toEqual([]);
    expect(getFriendAllByUserId).not.toHaveBeenCalled();
  });

  it("returns friends-of-friends while excluding friends and requests", async () => {
    const friendA: User = {
      id: "user_002",
      username: "sam_recovery",
      email: "sam@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-05T14:30:00.000Z",
    };

    const friendOfFriend: User = {
      id: "user_004",
      username: "morgan_recovery",
      email: "morgan@example.com",
      role: "RECOVERING_USER",
      createdAt: "2026-07-12T16:20:00.000Z",
    };

    const directFriendship: Friend = {
      id: "friendship_001",
      userId: "user_001",
      friendId: "user_002",
      status: "ACCEPTED",
      createdAt: "2026-07-15T10:00:00.000Z",
    };

    const secondFriendship: Friend = {
      id: "friendship_002",
      userId: "user_002",
      friendId: "user_004",
      status: "ACCEPTED",
      createdAt: "2026-07-16T10:00:00.000Z",
    };

    vi.mocked(findUserByUserId)
      .mockResolvedValueOnce(recoveringUser)
      .mockResolvedValueOnce(friendOfFriend);
    vi.mocked(getFriendAllByUserId)
      .mockResolvedValueOnce([directFriendship])
      .mockResolvedValueOnce([secondFriendship]);
    vi.mocked(getSentFriendRequestsByUserId).mockResolvedValueOnce([]);
    vi.mocked(getFriendRequestsByUserId).mockResolvedValueOnce([]);

    const result = await getSuggestionFriendsService("user_001");

    expect(result).toEqual([friendOfFriend]);
    expect(getSentFriendRequestsByUserId).toHaveBeenCalledWith("user_001");
    expect(getFriendRequestsByUserId).toHaveBeenCalledWith("user_001");
  });
});
