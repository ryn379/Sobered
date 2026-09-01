import { SobrietySummaryComponent } from "../components/SobrietySummary";
import { UserSummaryComponent } from "../components/UserSummary";
import { IntentionCard } from "../components/IntentionCard";
import { SponsorCard } from "../components/SponsorCard";
import { EmergencyButton } from "../components/EmergencyButton";
import { EmergencyRequests } from "../components/EmergencyRequests";
import { useSobriety } from "../hooks/useSobriety";
import { useUserHome } from "../hooks/useUserHome";
import { useEmergency } from "../hooks/useEmergency";

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

  const {
    emergencies,
    myEmergency,
    postRequest,
    acceptRequest,
    closeRequest,
    escalateRequest,
    refetchEmergencies,
  } = useEmergency(userId, user?.role ?? "RECOVERING_USER");

  const handleSubmit = async (type: string) => {
    const response = await postRequest(type);

    refetchEmergencies();

    return response;
  };

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
        {/* Page header: who you are and the one thing that always needs to be one tap away */}
        <div className="flex flex-col gap-4 border-b border-[#2A2E36] pb-8 sm:flex-row sm:items-start sm:justify-between">
          <UserSummaryComponent
            user={user}
            note="One day at a time. You're doing this."
          />
          <EmergencyButton
            emergency={myEmergency}
            onSubmit={handleSubmit}
            onClose={closeRequest}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Today: the steady, low-stakes overview */}
            <section className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6 md:p-8">
              <h2 className="text-lg font-medium text-[#E8EBF0]">Today</h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SobrietySummaryComponent
                  sobriety={sobriety}
                  nextMilestone={90}
                />
                <IntentionCard intention="Notice one moment of calm today, and let it be enough." />
              </div>
            </section>

            {/* Emergency requests: kept in its own container so it reads as
                a distinct, higher-attention feed rather than another "today" tile */}
            <section className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6 md:p-8">
              <EmergencyRequests
                emergencies={emergencies}
                myEmergency={myEmergency}
                role={user.role}
                onAccept={acceptRequest}
                onClose={closeRequest}
                onEscalate={escalateRequest}
              />
            </section>
          </div>

          <div className="space-y-6">
            {sponsor && (
              <SponsorCard
                sponsor={sponsor}
                availability="weekdays, 8am–8pm"
                phone={sponsor.phone}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
