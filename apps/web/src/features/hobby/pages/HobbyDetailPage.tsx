import { Link, useParams } from "react-router-dom";

import { HobbyAnalysis } from "../components/HobbyAnalysis";
// import { useHobby } from "../hooks/useHobbies";
import { useHobbyAnalysis } from "../hooks/useHobbyAnalysis";

export const HobbyDetailPage = ({ userId }: { userId: string }) => {
  const { hobbyId } = useParams<{
    hobbyId: string;
  }>();

  // const { getHobby } = useHobby(userId);

  const {
    analysis,
    loading: analysisLoading,
    error: analysisError,
  } = useHobbyAnalysis(userId, hobbyId);

  if (!hobbyId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-[#C97880]">Invalid Hobby ID</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#14161B] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/hobby" className="text-sm text-[#6E8CA0] hover:underline">
          ← Back to hobbies
        </Link>

        <div className="mt-6">
          {analysisLoading && (
            <p className="text-[#9199A6]">Analyzing progress...</p>
          )}

          {analysisError && (
            <p className="rounded-md border border-[#C97880]/30 bg-[#1C1F26] p-4 text-[#C97880]">
              {analysisError.message}
            </p>
          )}

          {!analysisLoading && !analysisError && (
            <HobbyAnalysis analysis={analysis} />
          )}
        </div>
      </div>
    </main>
  );
};
