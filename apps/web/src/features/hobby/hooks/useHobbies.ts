import type { Hobby } from "../types";
import {
  createHobby,
  deleteHobby,
  getUserHobbies,
  getUserHobby,
  updateProgressHobby,
} from "../../../services/hobby.service.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useHobby = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["hobbies", userId];

  const {
    data: entries = [],
    isLoading: loading,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: () => getUserHobbies(userId),
    enabled: !!userId,
  });

  const getHobby = async (hobbyId: string) => {
    return getUserHobby(userId, hobbyId);
  };

  const addMutation = useMutation({
    mutationFn: ({
      hobbyTypeId,
      goal,
    }: {
      hobbyTypeId: string;
      goal: string;
    }) => createHobby(userId, hobbyTypeId, goal),
    onSuccess: (hobby) => {
      queryClient.setQueryData<Hobby[]>(queryKey, (prev = []) => [
        ...prev,
        hobby,
      ]);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (hobbyId: string) => deleteHobby(userId, hobbyId),
    onSuccess: (_, hobbyId) => {
      queryClient.setQueryData<Hobby[]>(queryKey, (prev = []) =>
        prev.filter((hobby) => hobby.id !== hobbyId),
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      hobbyId,
      progress,
      note,
    }: {
      hobbyId: string;
      progress: number;
      note: string;
    }) => updateProgressHobby(userId, hobbyId, progress, note),

    onSuccess: (updatedHobby) => {
      queryClient.setQueryData<Hobby[]>(queryKey, (prev = []) =>
        prev.map((hobby) =>
          hobby.id === updatedHobby.id ? updatedHobby : hobby,
        ),
      );
    },
  });

  return {
    entries,
    loading,
    error:
      fetchError ||
      addMutation.error ||
      removeMutation.error ||
      updateMutation.error,

    refetch,
    getHobby,

    addHobby: addMutation.mutateAsync,
    removeHobby: removeMutation.mutateAsync,
    updateProgress: (hobbyId: string, progress: number, note: string) =>
      updateMutation.mutateAsync({ hobbyId, progress, note }),

    adding: addMutation.isPending,
    removing: removeMutation.isPending,
    updating: updateMutation.isPending,
  };
};
