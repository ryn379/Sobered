import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { DiaryEntry } from "../types";
import { deleteEntryDiary, getDiary } from "../../../services/diary.service";

export const useDiary = (userId: string) => {
  const queryClient = useQueryClient();

  const queryKey = ["diary", userId];

  const {
    data: entries = [],
    isLoading: loading,
    error: fetchError,
    refetch,
  } = useQuery<DiaryEntry[]>({
    queryKey,
    queryFn: () => getDiary(userId),
    enabled: !!userId,
  });

  const deleteMutation = useMutation({
    mutationFn: (entryId: string) => deleteEntryDiary(userId, entryId),

    onSuccess: (_, entryId) => {
      queryClient.setQueryData<DiaryEntry[]>(queryKey, (current = []) =>
        current.filter((entry) => entry.id !== entryId),
      );
    },
  });

  return {
    entries,
    loading,
    error: fetchError || deleteMutation.error,
    refetch,
    deleteEntry: deleteMutation.mutateAsync,
    deleting: deleteMutation.isPending,
  };
};
