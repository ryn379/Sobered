import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { HobbyAnalysis } from "../components/HobbyAnalysis";
import { useHobby } from "../hooks/useHobbies";
import { useHobbyAnalysis } from "../hooks/useHobbyAnalysis";

export const HobbyDetailPage = () => {
  const { hobbyId } = useParams<{
    hobbyId: string;
  }>();

  const userId = "user_001";

  const { getHobby } = useHobby(userId);

  const {
    analysis,
    loading: analysisLoading,
    error: analysisError,
    getAnalysis,
  } = useHobbyAnalysis();

  useEffect(() => {
    if (!hobbyId) {
      return;
    }

    getAnalysis(userId, hobbyId);
  }, [hobbyId]);

  if (!hobbyId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F3EAD6]">
        <p className="text-[#B5495B]">Invalid Hobby ID</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EAD6] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/hobby" className="text-sm text-[#8A7A56] hover:underline">
          ← Back to hobbies
        </Link>

        <div className="mt-6">
          {analysisLoading && (
            <p className="text-[#6B6375]">Analyzing progress...</p>
          )}

          {analysisError && (
            <p className="rounded-md border border-[#B5495B]/30 bg-[#FBF6E9] p-4 text-[#B5495B]">
              {analysisError}
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
