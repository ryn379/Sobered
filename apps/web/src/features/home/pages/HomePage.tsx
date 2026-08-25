import { SobrietySummaryComponent } from "../components/SobrietySummary";
import { UserSummaryComponent } from "../components/UserSummary";
import { IntentionCard } from "../components/IntentionCard";
import { SponsorCard } from "../components/SponsorCard";
// import meetings
// import group
// import friends
// import family
// import hobby

import { useSobriety } from "../hooks/useSobriety";
import { useUserHome } from "../hooks/useUserHome";

interface HomePageProps {
  userId: string;
}

const HomePage = ({ userId }: HomePageProps) => {
  const {
    user,
    sponsor,
    loading: userLoading,
    error: userError,
  } = useUserHome(userId);

  const {
    sobriety,
    loading: sobrietyLoading,
    error: sobrietyError,
  } = useSobriety(userId);

  if (userLoading || sobrietyLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading...</p>
      </div>
    );
  }

  if (userError || sobrietyError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#C97880]">Failed to load home page.</p>
      </div>
    );
  }

  if (!user || !sobriety) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">No home data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14161B]">
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6 md:p-8">
              <UserSummaryComponent
                user={user}
                note="One day at a time. You're doing this."
              />

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SobrietySummaryComponent
                  sobriety={sobriety}
                  nextMilestone={90}
                />

                <IntentionCard intention="Notice one moment of calm today, and let it be enough." />
              </div>
            </div>
          </div>

          {sponsor && (
            <SponsorCard
              sponsor={sponsor}
              availability="weekdays, 8am–8pm"
              phone={sponsor.phone}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
