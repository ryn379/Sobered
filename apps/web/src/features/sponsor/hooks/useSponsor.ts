import { useCallback, useEffect, useState } from "react";
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
  const [sponsor, setSponsor] = useState<User | null | User[]>(null);
  const [requests, setRequests] = useState<User[]>([]);
  const [mentees, setMentees] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        sponsorData,
        sponsorReqData,
        sponsorMentees,
        sponsorSuggestionData,
      ] = await Promise.all([
        getSponsor(userId),
        getReqsSponsor(userId),
        getMentee(userId),
        getSuggestions(userId),
      ]);

      setSponsor(sponsorData);
      setRequests(sponsorReqData);
      setMentees(sponsorMentees);
      setSuggestions(sponsorSuggestionData);
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

  const sponsorAccept = async (requesterId: string) => {
    try {
      setError(null);

      const acceptedReq = await acceptSponsor(userId, requesterId);

      const { user: mentee } = await userHome(acceptedReq.requesterId);

      setMentees((prev) => [...prev, mentee]);

      return true;
    } catch (err) {
      console.log(err);
      setError("Failed to accept sponsor request");
      return false;
    }
  };

  const sponsorDecline = async (requesterId: string) => {
    try {
      setError(null);

      const declinedReq = await declineSponsor(userId, requesterId);

      setRequests((prev) => prev.filter((user) => user.id !== requesterId));
      if (declinedReq) return true;
    } catch (err) {
      console.log(err);
      setError("Failed to decline sponsor request");
      return false;
    }
  };

  const sponsorPost = async (recepientId: string) => {
    try {
      setError(null);

      await postReqSponsor(userId, recepientId);
    } catch (err) {
      console.log(err);
      setError("Failed to sent sponsor request");
    }
  };

  return {
    loading,
    error,

    sponsor,
    requests,
    mentees,
    suggestions,

    sponsorAccept,
    sponsorDecline,
    sponsorPost,
    refetch: fetchEntries,
  };
};
