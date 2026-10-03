import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmergencyRequest, User } from "../types";
import {
  acceptEmergencyRequest,
  closeEmergencyRequest,
  escalateEmergencyRequest,
  getAllEmergencyRequest,
  postEmergencyRequest,
} from "../../../services/emergency.service";

export const useEmergency = (userId: string, role: User["role"]) => {
  const queryClient = useQueryClient();
  const queryKey = ["emergencies", userId];

  const {
    data: emergencies = [],
    isLoading: loading,
    error: fetchError,
    refetch: refetchEmergencies,
  } = useQuery({
    queryKey,
    queryFn: () => getAllEmergencyRequest(userId),
    enabled: !!userId,
  });

  const postMutation = useMutation({
    mutationFn: async (type: string) => {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      return postEmergencyRequest(userId, type);
    },
    onSuccess: (response) => {
      queryClient.setQueryData<EmergencyRequest[]>(queryKey, (prev = []) => [
        ...prev,
        response,
      ]);
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async (reqId: string) => {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      return acceptEmergencyRequest(userId, reqId);
    },
    onSuccess: (_, reqId) => {
      queryClient.setQueryData<EmergencyRequest[]>(queryKey, (prev = []) =>
        prev.filter((e) => e.id !== reqId),
      );
    },
  });

  const closeMutation = useMutation({
    mutationFn: async (reqId: string) => {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      return closeEmergencyRequest(userId, reqId);
    },
    onSuccess: (_, reqId) => {
      queryClient.setQueryData<EmergencyRequest[]>(queryKey, (prev = []) =>
        prev.filter((e) => e.id !== reqId),
      );
    },
  });

  const escalateMutation = useMutation({
    mutationFn: async (reqId: string) => {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      if (role !== "PROFESSIONAL") {
        throw new Error("Recovering user cannot escalate");
      }
      return escalateEmergencyRequest(userId, reqId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const myEmergency = emergencies.find(
    (emergency) => emergency.userId === userId && emergency.status !== "CLOSED",
  );

  return {
    loading,
    error: fetchError || postMutation.error || acceptMutation.error || closeMutation.error || escalateMutation.error,
    emergencies,
    myEmergency,
    postRequest: postMutation.mutateAsync,
    acceptRequest: acceptMutation.mutateAsync,
    closeRequest: closeMutation.mutateAsync,
    escalateRequest: escalateMutation.mutateAsync,
    refetchEmergencies,
  };
};
