import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../../home/types";
import {
  acceptSponsor,
  declineSponsor,
  getMentee,
  getReqsSponsor,
  getSponsor,
  getSuggestions,
  postReqSponsor,
} from "../../../services/sponsor.service";
import { userHome } from "../../../services/user.service";

export const useSponsor = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["sponsorData", userId];

  const { data, isLoading: loading, error: fetchError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const [sponsor, requests, mentees, suggestions] = await Promise.all([
        getSponsor(userId),
        getReqsSponsor(userId),
        getMentee(userId),
        getSuggestions(userId),
      ]);
      return { sponsor, requests, mentees, suggestions };
    },
    enabled: !!userId,
  });

  const acceptMutation = useMutation({
    mutationFn: async (requesterId: string) => {
      const acceptedReq = await acceptSponsor(userId, requesterId);
      const { user: mentee } = await userHome(acceptedReq.requesterId);
      return mentee;
    },
    onSuccess: (mentee) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          requests: oldData.requests.filter((r: User) => r.id !== mentee.id),
          mentees: [...oldData.mentees, mentee],
        };
      });
    },
  });

  const declineMutation = useMutation({
    mutationFn: async (requesterId: string) => {
      return declineSponsor(userId, requesterId);
    },
    onSuccess: (_, requesterId) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          requests: oldData.requests.filter((r: User) => r.id !== requesterId),
        };
      });
    },
  });

  const postMutation = useMutation({
    mutationFn: async (recipientId: string) => {
      return postReqSponsor(userId, recipientId);
    },
    onSuccess: (request) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          suggestions: oldData.suggestions.filter(
            (s: User) => s.id !== request.recipientId
          ),
        };
      });
    },
  });

  const acceptWrapper = async (requesterId: string) => {
    try {
      await acceptMutation.mutateAsync(requesterId);
      return true;
    } catch {
      return false;
    }
  };

  const declineWrapper = async (requesterId: string) => {
    try {
      await declineMutation.mutateAsync(requesterId);
      return true;
    } catch {
      return false;
    }
  };

  const postWrapper = async (recipientId: string) => {
    try {
      await postMutation.mutateAsync(recipientId);
      return true;
    } catch {
      return false;
    }
  };

  return {
    loading,
    error: fetchError || acceptMutation.error || declineMutation.error || postMutation.error,
    sponsor: data?.sponsor || null,
    requests: data?.requests || [],
    mentees: data?.mentees || [],
    suggestions: data?.suggestions || [],
    sponsorAccept: acceptWrapper,
    sponsorDecline: declineWrapper,
    sponsorPost: postWrapper,
    refetch,
  };
};
