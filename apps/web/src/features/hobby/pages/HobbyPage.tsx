import { useNavigate } from "react-router-dom";

import { HobbyForm } from "../components/HobbyForm";
import { HobbyList } from "../components/HobbyList";
import { useHobby } from "../hooks/useHobbies";

export const HobbyPage = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const { entries, loading, error, removeHobby, refetch } = useHobby(userId);

  const handleSelect = (hobbyId: string) => {
    navigate(`/hobby/${hobbyId}`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading hobbies...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#14161B] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 border-b border-[#2C3038] pb-5">
          <p
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            className="text-xs uppercase tracking-[0.2em] text-[#5F6672]"
          >
            Growth · {entries.length}{" "}
            {entries.length === 1 ? "hobby" : "hobbies"}
          </p>

          <h1
            style={{ fontFamily: "'Fraunces', serif" }}
            className="mt-1 text-3xl font-semibold text-[#ECEDF0]"
          >
            Hobbies
          </h1>

          <p className="mt-2 text-sm text-[#9199A6]">
            Things worth spending time on.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-md border border-[#C97880]/30 bg-[#1C1F26] p-4 text-[#C97880]">
            {error.message}
          </div>
        )}

        <div className="mb-10">
          <HobbyForm userId={userId} onCreated={refetch} />
        </div>

        <HobbyList
          hobbies={entries}
          onDelete={removeHobby}
          onSelect={handleSelect}
        />
      </div>
    </main>
  );
};
