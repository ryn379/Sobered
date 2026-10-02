import type { GroupMessage } from "../types";
import {
  getGroupMessages,
  sendGroupMessage,
} from "../../../services/groupMessage.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGroupMessage = (userId: string, groupId: string) => {
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading: loading,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: ["groupMessages", userId, groupId],
    queryFn: () => getGroupMessages(userId, groupId),
    enabled: !!userId && !!groupId,
  });

  const {
    mutateAsync: sendMessage,
    isPending: sending,
    error: sendError,
  } = useMutation({
    mutationFn: (content: string) => sendGroupMessage(userId, groupId, content),

    onSuccess: (message) => {
      queryClient.setQueryData<GroupMessage[]>(
        ["groupMessages", userId, groupId],
        (prev = []) => [...prev, message],
      );
    },
  });

  return {
    messages,
    loading,
    sending,
    error: fetchError || sendError,
    sendMessage,
    refetch,
  };
};
