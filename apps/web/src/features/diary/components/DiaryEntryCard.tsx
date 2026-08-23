import type { DiaryEntry } from "../types.ts";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onDelete: (entryId: string) => void;
}

export const DiaryEntryCard = ({ entry, onDelete }: DiaryEntryCardProps) => {
  return (
    <article className="relative rounded-sm border border-[#D8C9A8] bg-[#FFFDF7] p-6 pl-8 shadow-[0_1px_4px_rgba(0,0,0,0.08)] transition hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
      <span className="absolute -top-2 left-6 h-4 w-14 -rotate-3 bg-[#C9DCE0]/70" />
      <span className="absolute bottom-5 left-4 top-5 w-px bg-[#D98A93]" />

      <div className="mb-3 flex items-start justify-between gap-3">
        <h2
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-2xl font-bold text-[#2B2B3D]"
        >
          {entry.title}
        </h2>
        <button
          onClick={() => onDelete(entry.id)}
          aria-label="Delete entry"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B5495B]/40 text-xs text-[#B5495B] transition hover:bg-[#B5495B] hover:text-white"
        >
          ×
        </button>
      </div>

      <p className="whitespace-pre-wrap font-serif text-[15px] leading-8 text-[#3A3A4D]">
        {entry.content}
      </p>

      <small
        style={{ fontFamily: "'Caveat', cursive" }}
        className="mt-3 block text-right text-lg italic text-[#B3A688]"
      >
        {new Date(entry.createdAt).toLocaleDateString()}
      </small>
    </article>
  );
};
