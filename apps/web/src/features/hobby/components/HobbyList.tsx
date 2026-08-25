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
      <div className="rounded-md border border-dashed border-[#2C3038] p-10 text-center">
        <p
          style={{ fontFamily: "'Fraunces', serif" }}
          className="text-xl font-semibold text-[#ECEDF0]"
        >
          No hobbies yet.
        </p>

        <p className="mt-2 text-sm text-[#9199A6]">
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
