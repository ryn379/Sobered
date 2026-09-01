import { useCallback, useEffect, useState } from "react";
import type { EmergencyRequest, User } from "../types";
import {
  acceptEmergencyRequest,
  closeEmergencyRequest,
  escalateEmergencyRequest,
  getAllEmergencyRequest,
  postEmergencyRequest,
} from "../../../services/emergency.service";

export const useEmergency = (userId: string, role: User["role"]) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>([]);

  const fetchEmergencies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const emergencyData = await getAllEmergencyRequest(userId);

      setEmergencies(emergencyData);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch emergencies");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchEmergencies();
  }, [fetchEmergencies]);

  const postRequest = async (type: string) => {
    try {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      const response = await postEmergencyRequest(userId, type);

      return response;
    } catch (err) {
      console.log(err);
      setError("Failed to post emergency request");
    }
  };

  const acceptRequest = async (reqId: string) => {
    try {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      const response = await acceptEmergencyRequest(userId, reqId);

      // add more functionality here

      setEmergencies((prev) => prev.filter((e) => e.id !== reqId));

      return response;
    } catch (err) {
      console.log(err);
      setError("Failed to accept request");
    }
  };

  const closeRequest = async (reqId: string) => {
    try {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }
      const response = await closeEmergencyRequest(userId, reqId);

      setEmergencies((prev) => prev.filter((e) => e.id !== reqId));

      return response;
    } catch (err) {
      console.log(err);
      setError("Failed to close request");
    }
  };

  const escalateRequest = async (reqId: string) => {
    try {
      if (role === "FAMILY_MEMBER") {
        throw new Error("Family member cannot");
      }

      if (role !== "PROFESSIONAL") {
        throw new Error("Recovering user cannot escalate");
      }

      const response = await escalateEmergencyRequest(userId, reqId);

      return response;
    } catch (err) {
      console.log(err);
      setError("Failed to escalate");
    }
  };

  const myEmergency = emergencies.find(
    (emergency) => emergency.userId === userId && emergency.status !== "CLOSED",
  );

  return {
    loading,
    error,

    emergencies,
    myEmergency,
    postRequest,
    acceptRequest,
    closeRequest,
    escalateRequest,
    refetchEmergencies: fetchEmergencies,
  };
};
