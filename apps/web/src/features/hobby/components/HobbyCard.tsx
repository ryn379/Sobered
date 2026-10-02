import type { Hobby } from "../types";

interface HobbyCardProps {
  hobby: Hobby;
  onDelete: (hobbyId: string) => Promise<Hobby>;
  onSelect: (hobbyId: string) => void;
}

export const HobbyCard = ({ hobby, onDelete, onSelect }: HobbyCardProps) => {
  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const confirmed = window.confirm(`Delete ${hobby.name}?`);

    if (!confirmed) {
      return;
    }

    await onDelete(hobby.id);
  };

  return (
    <div
      onClick={() => onSelect(hobby.id)}
      className="cursor-pointer rounded-md border border-[#2C3038] bg-[#1C1F26] p-6 transition hover:-translate-y-1 hover:border-[#3A3F4A]"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            style={{ fontFamily: "'Fraunces', serif" }}
            className="text-2xl font-semibold text-[#ECEDF0]"
          >
            {hobby.name}
          </h2>

          <p className="mt-2 text-sm text-[#9199A6]">{hobby.description}</p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md px-3 py-1 text-sm text-[#C97880] hover:bg-[#C97880]/10"
        >
          Delete
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#9199A6]">Progress</span>

          <span className="font-medium text-[#ECEDF0]">{hobby.progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#2C3038]">
          <div
            className="h-full rounded-full bg-[#6E8CA0]"
            style={{ width: `${hobby.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-between text-sm text-[#9199A6]">
        <span>Goal: {hobby.goal || "No goal"}</span>

        <span>🔥 {hobby.currentStreak} days</span>
      </div>
    </div>
  );
};
