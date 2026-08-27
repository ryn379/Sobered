import type { SponsorSuggestionsProps } from "../types";
import { SponsorSuggestionCard } from "./SponsorSuggestionCard";

export const SponsorSuggestions = ({
  suggestions,
  sendRequest,
}: SponsorSuggestionsProps) => {
  if (suggestions.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
        <p className="text-[#E8EBF0]">No suggestions right now.</p>

        <p className="mt-2 text-sm text-[#9199A6]">
          Suggestions are based on people in your network.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">
          Suggested Sponsors
        </h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          People in your network who may benefit from having a sponsor.
        </p>
      </div>

      <div className="space-y-3">
        {suggestions.map((user) => (
          <SponsorSuggestionCard
            key={user.id}
            user={user}
            onSendRequest={sendRequest}
          />
        ))}
      </div>
    </section>
  );
};
