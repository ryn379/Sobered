import { useState } from "react";

import { useFamily } from "../hooks/useFamily";
import type { User } from "../../home/types";

import { FamilyHeader } from "../components/FamilyHeader";
import { FamilyEmptyState } from "../components/FamilyEmptyState";
import { FamilyMembers } from "../components/FamilyMembers";
import { RecovererList } from "../components/RecovererList";
import { SobrietyStatsCard } from "../components/SobrietyStatsCard";

export const FamilyPage = ({
  userId,
  role,
}: {
  userId: string;
  role: User["role"];
}) => {
  const { loading, error, family, recoverer, sobrietyStats, getRecoverer } =
    useFamily(userId, role);

  const [selectedRecoverer, setSelectedRecoverer] = useState<User | null>(null);

  const [detailsLoading, setDetailsLoading] = useState(false);

  const handleRecovererClick = async (user: User) => {
    setSelectedRecoverer(user);
    setDetailsLoading(true);

    await getRecoverer(user.id);

    setDetailsLoading(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#14161B]">
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
          <p className="text-sm text-[#9199A6]">Loading family...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#14161B]">
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
          <p className="text-sm text-[#C97880]">{error}</p>
        </div>
      </main>
    );
  }

  const people = role === "RECOVERING_USER" ? family : recoverer;

  return (
    <main className="min-h-screen bg-[#14161B]">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
        <FamilyHeader role={role} />

        {people.length === 0 ? (
          <FamilyEmptyState role={role} />
        ) : role === "RECOVERING_USER" ? (
          <FamilyMembers family={family} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <RecovererList
              recoverers={recoverer}
              selectedRecoverer={selectedRecoverer}
              onRecovererClick={handleRecovererClick}
            />

            <section>
              {!selectedRecoverer ? (
                <div className="flex min-h-60 items-center justify-center rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
                  <div>
                    <p className="text-[#E8EBF0]">Select a recoverer</p>

                    <p className="mt-2 text-sm text-[#9199A6]">
                      Their sobriety statistics will appear here.
                    </p>
                  </div>
                </div>
              ) : detailsLoading ? (
                <div className="flex min-h-60 items-center justify-center rounded-lg border border-[#2A2E36] bg-[#1C1F26]">
                  <p className="text-sm text-[#9199A6]">
                    Loading sobriety details...
                  </p>
                </div>
              ) : sobrietyStats ? (
                <SobrietyStatsCard
                  recoverer={selectedRecoverer}
                  stats={sobrietyStats}
                />
              ) : (
                <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
                  <p className="text-[#E8EBF0]">No sobriety data available.</p>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};
