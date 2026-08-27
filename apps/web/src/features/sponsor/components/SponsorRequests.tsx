import type { SponsorRequestProps } from "../types";
import { SponsorRequestCard } from "./SponsorRequestCard";

export const SponsorRequests = ({
  requests,
  onAccept,
  onDecline,
}: SponsorRequestProps) => {
  if (requests.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
        <p className="text-[#E8EBF0]">No sponsor requests.</p>

        <p className="mt-2 text-sm text-[#9199A6]">
          New requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">Sponsor requests</h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          People who would like you to become their sponsor.
        </p>
      </div>

      <div className="space-y-3">
        {requests.map((requester) => (
          <SponsorRequestCard
            key={requester.id}
            requester={requester}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        ))}
      </div>
    </section>
  );
};
