import type { DiaryEntry } from "../types";
import { DiaryEntryCard } from "./DiaryEntryCard";

interface DiaryEntryListProps {
  entries: DiaryEntry[];
  onDelete: (entryId: string) => void;
}

export const DiaryEntryList = ({ entries, onDelete }: DiaryEntryListProps) => {
  if (entries.length === 0) {
    return (
      <p
        style={{ fontFamily: "'Caveat', cursive" }}
        className="py-12 text-center text-2xl text-[#B3A688]"
      >
        This page is empty. Start writing above.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {entries.map((entry) => (
        <DiaryEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
};
