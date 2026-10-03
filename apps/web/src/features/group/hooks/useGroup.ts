import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const groupsKey = ["groups", userId];

  const {
    data: groups = [],
    isLoading: loading,
    error: groupsError,
    refetch,
  } = useQuery<Group[]>({
    queryKey: groupsKey,
    queryFn: () => getGroups(userId),
    enabled: !!userId,
  });

  const groupGet = async (groupId: string) => {
    return queryClient.fetchQuery({
      queryKey: ["group", userId, groupId],
      queryFn: () => getGroup(userId, groupId),
    });
  };

  const groupMembers = async (groupId: string) => {
    return queryClient.fetchQuery({
      queryKey: ["groupMembers", userId, groupId],
      queryFn: () => membersGroup(userId, groupId),
    });
  };

  const groupLeaders = async (groupId: string) => {
    return queryClient.fetchQuery({
      queryKey: ["groupLeaders", userId, groupId],
      queryFn: () => leaderGroup(userId, groupId),
    });
  };

  const groupJoinMutation = useMutation({
    mutationFn: (groupId: string) => joinGroup(userId, groupId),

    onSuccess: async (result) => {
      const joinedGroup = await getGroup(userId, result.groupId);

      queryClient.setQueryData<Group[]>(groupsKey, (prev = []) => [
        ...prev,
        joinedGroup,
      ]);
    },
  });

  const groupLeaveMutation = useMutation({
    mutationFn: (groupId: string) => leaveGroup(userId, groupId),

    onSuccess: (result) => {
      queryClient.setQueryData<Group[]>(groupsKey, (prev = []) =>
        prev.filter((group) => group.id !== result.id),
      );
    },
  });

  const groupLeaderAssignMutation = useMutation({
    mutationFn: ({
      memberId,
      groupId,
    }: {
      memberId: string;
      groupId: string;
    }) => assignLeaderGroup(userId, memberId, groupId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupLeaders", userId, variables.groupId],
      });

      queryClient.invalidateQueries({
        queryKey: ["groupMembers", userId, variables.groupId],
      });
    },
  });

  const groupLeaderRemoveMutation = useMutation({
    mutationFn: ({
      removedId,
      groupId,
    }: {
      removedId: string;
      groupId: string;
    }) => removeLeaderGroup(userId, removedId, groupId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupLeaders", userId, variables.groupId],
      });

      queryClient.invalidateQueries({
        queryKey: ["groupMembers", userId, variables.groupId],
      });
    },
  });

  const groupUserRemoveMutation = useMutation({
    mutationFn: ({
      removedId,
      groupId,
    }: {
      removedId: string;
      groupId: string;
    }) => removeUserGroup(userId, removedId, groupId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["groupMembers", userId, variables.groupId],
      });
    },
  });

  return {
    groups,

    loading,
    error:
      groupsError ||
      groupJoinMutation.error ||
      groupLeaveMutation.error ||
      groupLeaderAssignMutation.error ||
      groupLeaderRemoveMutation.error ||
      groupUserRemoveMutation.error,

    groupGet,
    groupMembers,
    groupLeaders,

    groupJoin: groupJoinMutation.mutateAsync,
    groupLeave: groupLeaveMutation.mutateAsync,
    groupLeaderAssign: groupLeaderAssignMutation.mutateAsync,
    groupLeaderRemove: groupLeaderRemoveMutation.mutateAsync,
    groupUserRemove: groupUserRemoveMutation.mutateAsync,

    joining: groupJoinMutation.isPending,
    leaving: groupLeaveMutation.isPending,
    assigningLeader: groupLeaderAssignMutation.isPending,
    removingLeader: groupLeaderRemoveMutation.isPending,
    removingUser: groupUserRemoveMutation.isPending,
    refetch,
  };
};
