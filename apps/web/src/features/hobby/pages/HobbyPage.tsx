import { useNavigate } from "react-router-dom";

import { HobbyForm } from "../components/HobbyForm";
import { HobbyList } from "../components/HobbyList";
import { useHobby } from "../hooks/useHobbies";

export const HobbyPage = () => {
  const userId = "user_001";

  const navigate = useNavigate();

  const { entries, loading, error, removeHobby, refetch } = useHobby(userId);

  const handleSelect = (hobbyId: string) => {
    navigate(`/hobby/${hobbyId}`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F3EAD6]">
        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-3xl text-[#6B6375]"
        >
          loading hobbies...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EAD6] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A7A56]">
            Growth
          </p>

          <h1
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-5xl font-bold text-[#08060D]"
          >
            My Hobbies
          </h1>

          <p className="mt-3 text-[#6B6375]">Things worth spending time on.</p>
        </header>

        {error && (
          <div className="mb-6 rounded-md border border-[#B5495B]/30 bg-[#FBF6E9] p-4 text-[#B5495B]">
            {error}
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
