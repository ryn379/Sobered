import { useCallback, useEffect, useState } from "react";

import type { User } from "../../home/types";

import {
  acceptRequestFriends,
  declineRequestFriends,
  deleteFriend,
  getRequestFriends,
  getFriends,
  postRequestFriends,
  getSuggestionFriends,
} from "../../../services/friend.service";

export const useFriend = (userId: string) => {
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [friendsData, requestsData, suggestionsData] = await Promise.all([
        getFriends(userId),
        getRequestFriends(userId),
        getSuggestionFriends(userId),
      ]);

      setFriends(friendsData);
      setRequests(requestsData);
      setSuggestions(suggestionsData);
    } catch (err) {
      console.error(err);
      setError("Failed to load friends");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const addFriend = async (recipientId: string) => {
    try {
      setError(null);

      await postRequestFriends(userId, recipientId);

      setSuggestions((prev) => prev.filter((user) => user.id !== recipientId));

      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to send friend request");
      return false;
    }
  };

  const acceptRequest = async (requesterId: string) => {
    try {
      setError(null);

      const request = await acceptRequestFriends(userId, requesterId);

      setRequests((prev) => prev.filter((user) => user.id !== requesterId));

      return request;
    } catch (err) {
      console.error(err);
      setError("Failed to accept friend request");
      return null;
    }
  };

  const declineRequest = async (requesterId: string) => {
    try {
      setError(null);

      const request = await declineRequestFriends(userId, requesterId);

      setRequests((prev) => prev.filter((user) => user.id !== requesterId));

      return request;
    } catch (err) {
      console.error(err);
      setError("Failed to decline friend request");
      return null;
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      setError(null);

      await deleteFriend(userId, friendId);

      setFriends((prev) => prev.filter((user) => user.id !== friendId));

      return true;
    } catch (err) {
      console.error(err);
      setError("Failed to remove friend");
      return false;
    }
  };

  return {
    friends,
    requests,
    suggestions,

    loading,
    error,

    addFriend,
    acceptRequest,
    declineRequest,
    removeFriend,

    refetch: fetchFriends,
  };
};
