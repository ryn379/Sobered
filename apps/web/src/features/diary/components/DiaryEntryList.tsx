import type { DiaryEntry } from "../types";
import { DiaryEntryCard } from "./DiaryEntryCard";

interface DiaryEntryListProps {
  entries: DiaryEntry[];
  onDelete: (entryId: string) => void;
}

export const DiaryEntryList = ({ entries, onDelete }: DiaryEntryListProps) => {
  if (entries.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-[#2C3038] py-14 text-center">
        <p className="text-sm text-[#5F6672]">
          No entries yet — write your first one above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <DiaryEntryCard key={entry.id} entry={entry} onDelete={onDelete} />
      ))}
    </div>
  );
};
