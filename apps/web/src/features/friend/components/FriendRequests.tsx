import type { FriendRequestsProps } from "../types";
import { FriendRequestCard } from "./FriendRequestCard";

export const FriendRequests = ({
  requests,
  onAccept,
  handleAccept,
  onDecline,
}: FriendRequestsProps) => {
  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] px-6 py-12 text-center">
        <p className="text-[#E8EBF0]">No incoming requests.</p>

        <p className="mt-2 text-sm text-[#9199A6]">You're all caught up.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-2 text-lg font-medium text-[#E8EBF0]">
        Incoming Requests
      </h2>

      <p className="mb-5 text-sm text-[#9199A6]">
        People who want to connect with you.
      </p>

      <div className="space-y-3">
        {requests.map((requester) => (
          <FriendRequestCard
            key={requester.id}
            requester={requester}
            onAccept={onAccept}
            handleAccept={handleAccept}
            onDecline={onDecline}
          />
        ))}
      </div>
    </section>
  );
};
