import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { DiaryEntryList } from "../components/DiaryEntryList";
import { useDiary } from "../hooks/useDiary";

export const DiaryPage = () => {
  const userId = "user_001";

  const { entries, loading, error, deleteEntry, refetch } = useDiary(userId);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading entries…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="rounded-md border border-[#C97880]/30 bg-[#1C1F26] px-5 py-3 text-sm text-[#C97880]">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#14161B] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 border-b border-[#2C3038] pb-5">
          <p
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            className="text-xs uppercase tracking-[0.2em] text-[#5F6672]"
          >
            Personal · {entries.length}{" "}
            {entries.length === 1 ? "entry" : "entries"}
          </p>
          <h1
            style={{ fontFamily: "'Fraunces', serif" }}
            className="mt-1 text-3xl font-semibold text-[#ECEDF0]"
          >
            Diary
          </h1>
        </header>

        <div className="mb-8">
          <DiaryEntryForm userId={userId} onCreated={refetch} />
        </div>

        <DiaryEntryList entries={entries} onDelete={deleteEntry} />
      </div>
    </main>
  );
};
