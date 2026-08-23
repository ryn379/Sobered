import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { DiaryEntryList } from "../components/DiaryEntryList";
import { useDiary } from "../hooks/useDiary";

export const DiaryPage = () => {
  const userId = "user_001";

  const { entries, loading, error, deleteEntry, refetch } = useDiary(userId);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3EAD6]">
        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-2xl text-[#5B5B72]"
        >
          turning the page...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3EAD6]">
        <p className="rounded-sm border border-[#B5495B]/30 bg-[#FBF6E9] px-5 py-3 text-[#B5495B]">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EAD6] px-4 py-12">
      <div
        className="mx-auto max-w-2xl rounded-sm bg-[#FBF6E9] p-8 shadow-[0_2px_14px_rgba(0,0,0,0.15)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 35px, #E4D8BC 36px)",
          backgroundPositionY: "110px",
        }}
      >
        <header className="mb-8 border-b-2 border-dashed border-[#C9B98C] pb-4 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A7A56]">
            Personal
          </p>
          <h1
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-5xl font-bold text-black"
          >
            My Diary
          </h1>
        </header>

        <div className="mb-10">
          <DiaryEntryForm userId={userId} onCreated={refetch} />
        </div>

        <DiaryEntryList entries={entries} onDelete={deleteEntry} />
      </div>
    </main>
  );
};
