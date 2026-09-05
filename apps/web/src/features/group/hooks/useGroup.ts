import { useCallback, useEffect, useState } from "react";
import type { Group } from "../types";
import {
  assignLeaderGroup,
  getGroup,
  getGroups,
  joinGroup,
  leaderGroup,
  leaveGroup,
  membersGroup,
  removeLeaderGroup,
  removeUserGroup,
} from "../../../services/group.service";

export const useGroup = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [groups, setGroups] = useState<Group[]>([]);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const groupsData = await getGroups(userId);

      setGroups(groupsData);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch entries");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const groupGet = async (groupId: string) => {
    try {
      const result = await getGroup(userId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("Failed to find group");
    }
  };

  const groupJoin = async (groupId: string) => {
    try {
      const result = await joinGroup(userId, groupId);

      const joinedGroup = await getGroup(userId, result.groupId);

      setGroups((prev) => [...prev, joinedGroup]);
    } catch (err) {
      console.log(err);
      setError("Failed to join group");
    }
  };

  const groupLeave = async (groupId: string) => {
    try {
      const result = await leaveGroup(userId, groupId);

      setGroups((prev) => prev.filter((e) => e.id !== result.id));

      return result;
    } catch (err) {
      console.log(err);
      setError("You shall not leave");
    }
  };

  const groupMembers = async (groupId: string) => {
    try {
      const result = await membersGroup(userId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("Failed to fetch members");
    }
  };

  const groupLeaders = async (groupId: string) => {
    try {
      const result = await leaderGroup(userId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("Failed to fetch leaders");
    }
  };

  const groupLeaderAssign = async (memberId: string, groupId: string) => {
    try {
      const result = await assignLeaderGroup(userId, memberId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("You are not worthy of leadership");
    }
  };

  const groupLeaderRemove = async (removedId: string, groupId: string) => {
    try {
      const result = await removeLeaderGroup(userId, removedId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("your resignation is not accepted");
    }
  };

  const groupUserRemove = async (removedId: string, groupId: string) => {
    try {
      const result = await removeUserGroup(userId, removedId, groupId);

      return result;
    } catch (err) {
      console.log(err);
      setError("your resignation is not accepted");
    }
  };

  return {
    loading,
    error,

    groups,

    groupGet,
    groupJoin,
    groupLeave,
    groupMembers,
    groupLeaders,
    groupLeaderAssign,
    groupLeaderRemove,
    groupUserRemove,
    refetch: fetchEntries,
  };
};
