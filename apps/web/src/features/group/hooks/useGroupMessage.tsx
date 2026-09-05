import { useCallback, useEffect, useState } from "react";
import type { GroupMessage } from "../types";
import {
  getGroupMessages,
  sendGroupMessage,
} from "../../../services/groupMessage.service";

export const useGroupMessage = (userId: string, groupId: string) => {
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<GroupMessage[]>([]);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getGroupMessages(userId, groupId);

      setMessages(data);
    } catch (err) {
      console.log(err);

      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [userId, groupId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (content: string) => {
    try {
      setError(null);

      const message = await sendGroupMessage(userId, groupId, content);

      setMessages((prev) => [...prev, message]);

      return message;
    } catch (err) {
      console.log(err);

      setError("Failed to send message");
    }
  };

  return {
    loading,
    error,
    messages,
    sendMessage,
    refetch: fetchMessages,
  };
};
