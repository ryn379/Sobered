import type { Hobby } from "../types";
import { HobbyCard } from "./HobbyCard";

interface HobbyListProps {
  hobbies: Hobby[];
  onDelete: (hobbyId: string) => Promise<boolean>;
  onSelect: (hobbyId: string) => void;
}

export const HobbyList = ({ hobbies, onDelete, onSelect }: HobbyListProps) => {
  if (hobbies.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-[#C9B98C] p-10 text-center">
        <p
          style={{ fontFamily: "'Caveat', cursive" }}
          className="text-2xl text-[#6B6375]"
        >
          No hobbies yet.
        </p>

        <p className="mt-2 text-sm text-[#6B6375]">
          Choose something you'd like to work on.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {hobbies.map((hobby) => (
        <HobbyCard
          key={hobby.id}
          hobby={hobby}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
