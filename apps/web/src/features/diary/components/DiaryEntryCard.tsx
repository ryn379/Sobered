import type { DiaryEntry } from "../types.ts";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onDelete: (entryId: string) => void;
}

export const DiaryEntryCard = ({ entry, onDelete }: DiaryEntryCardProps) => {
  return (
    <article className="group relative rounded-md border border-[#2C3038] bg-[#1C1F26] p-6 pl-7 transition hover:border-[#3A3F4A]">
      <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-md bg-[#6E8CA0]/60 transition group-hover:bg-[#6E8CA0]" />

      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2
            style={{ fontFamily: "'Fraunces', serif" }}
            className="text-xl font-semibold leading-snug text-[#ECEDF0]"
          >
            {entry.title}
          </h2>
          <time
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            className="mt-1 block text-xs uppercase tracking-wider text-[#5F6672]"
          >
            {new Date(entry.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </time>
        </div>

        <button
          onClick={() => onDelete(entry.id)}
          aria-label="Delete entry"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#2C3038] text-sm text-[#9199A6] opacity-0 transition hover:border-[#C97880]/50 hover:text-[#C97880] group-hover:opacity-100 focus:opacity-100"
        >
          ×
        </button>
      </div>

      <p className="whitespace-pre-wrap text-[15px] leading-7 text-[#B7BCC6]">
        {entry.content}
      </p>
    </article>
  );
};
