import { useState } from "react";

import { useSponsor } from "../hooks/useSponsor";
import { SponsorHeader } from "../components/SponsorHeader";
import { SponsorCard } from "../../home/components/SponsorCard";
import { SponsorRequests } from "../components/SponsorRequests";
import { SponsorMentees } from "../components/SponsorMentees";
import { SponsorSuggestions } from "../components/SponsorSuggestions";

import type { SponsorTab } from "../types";

export const SponsorPage = ({ userId }: { userId: string }) => {
  const [active, setActive] = useState<SponsorTab>("Sponsor");

  const {
    loading,
    error,
    sponsor,
    requests,
    mentees,
    suggestions,
    sponsorAccept,
    sponsorDecline,
    sponsorPost,
    refetch,
  } = useSponsor(userId);

  const handleAccept = async (requesterId: string) => {
    const result = await sponsorAccept(requesterId);

    if (!result) return;

    await refetch();

    setActive("Mentees");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#C97880]">{error.message}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#14161B]">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
        <SponsorHeader
          active={active}
          onChange={setActive}
          requestCount={requests.length}
        />

        <div className="mt-8">
          {active === "Sponsor" && (
            <>
              {sponsor ? (
                <SponsorCard
                  sponsor={sponsor}
                  availability="weekdays, 8am-8pm"
                />
              ) : (
                <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
                  <p className="text-lg font-medium text-[#E8EBF0]">
                    You don't have a sponsor yet.
                  </p>

                  <p className="mx-auto mt-2 max-w-md text-sm text-[#9199A6]">
                    Find someone you trust and begin building a support
                    connection.
                  </p>

                  <button
                    type="button"
                    onClick={() => setActive("Suggestions")}
                    className="mt-6 rounded-md bg-[#6E8CA0] px-5 py-2.5 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE]"
                  >
                    View suggestions
                  </button>
                </div>
              )}
            </>
          )}

          {active === "Requests" && (
            <SponsorRequests
              requests={requests}
              onAccept={handleAccept}
              onDecline={sponsorDecline}
            />
          )}

          {active === "Mentees" && <SponsorMentees mentees={mentees} />}

          {active === "Suggestions" && (
            <SponsorSuggestions
              suggestions={suggestions}
              sendRequest={sponsorPost}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default SponsorPage;
