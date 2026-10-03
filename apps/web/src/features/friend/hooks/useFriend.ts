import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const friendsKey = ["friends", userId];
  const requestsKey = ["friendRequests", userId];
  const suggestionsKey = ["friendSuggestions", userId];

  const {
    data: friends = [],
    isLoading: friendsLoading,
    error: friendsError,
    refetch: refetchFriends,
  } = useQuery<User[]>({
    queryKey: friendsKey,
    queryFn: () => getFriends(userId),
    enabled: !!userId,
  });

  const {
    data: requests = [],
    isLoading: requestsLoading,
    error: requestsError,
    refetch: refetchRequests,
  } = useQuery<User[]>({
    queryKey: requestsKey,
    queryFn: () => getRequestFriends(userId),
    enabled: !!userId,
  });

  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    error: suggestionsError,
    refetch: refetchSuggestions,
  } = useQuery<User[]>({
    queryKey: suggestionsKey,
    queryFn: () => getSuggestionFriends(userId),
    enabled: !!userId,
  });

  const addFriendMutation = useMutation({
    mutationFn: (recipientId: string) =>
      postRequestFriends(userId, recipientId),

    onSuccess: (_, recipientId) => {
      queryClient.setQueryData<User[]>(suggestionsKey, (prev = []) =>
        prev.filter((user) => user.id !== recipientId),
      );
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (requesterId: string) =>
      acceptRequestFriends(userId, requesterId),

    onSuccess: (_, requesterId) => {
      queryClient.setQueryData<User[]>(requestsKey, (prev = []) =>
        prev.filter((user) => user.id !== requesterId),
      );

      queryClient.invalidateQueries({
        queryKey: friendsKey,
      });
    },
  });

  const declineRequestMutation = useMutation({
    mutationFn: (requesterId: string) =>
      declineRequestFriends(userId, requesterId),

    onSuccess: (_, requesterId) => {
      queryClient.setQueryData<User[]>(requestsKey, (prev = []) =>
        prev.filter((user) => user.id !== requesterId),
      );
    },
  });

  const removeFriendMutation = useMutation({
    mutationFn: (friendId: string) => deleteFriend(userId, friendId),

    onSuccess: (_, friendId) => {
      queryClient.setQueryData<User[]>(friendsKey, (prev = []) =>
        prev.filter((user) => user.id !== friendId),
      );
    },
  });

  return {
    friends,
    requests,
    suggestions,
    loading: friendsLoading || requestsLoading || suggestionsLoading,
    error:
      friendsError ||
      requestsError ||
      suggestionsError ||
      addFriendMutation.error ||
      acceptRequestMutation.error ||
      declineRequestMutation.error ||
      removeFriendMutation.error,
    addFriend: addFriendMutation.mutateAsync,
    acceptRequest: acceptRequestMutation.mutateAsync,
    declineRequest: declineRequestMutation.mutateAsync,
    removeFriend: removeFriendMutation.mutateAsync,
    addingFriend: addFriendMutation.isPending,
    acceptingRequest: acceptRequestMutation.isPending,
    decliningRequest: declineRequestMutation.isPending,
    removingFriend: removeFriendMutation.isPending,

    refetch: () => {
      refetchFriends();
      refetchRequests();
      refetchSuggestions();
    },
  };
};
