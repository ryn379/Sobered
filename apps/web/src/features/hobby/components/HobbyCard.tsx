import type { Hobby } from "../types";

interface HobbyCardProps {
  hobby: Hobby;
  onDelete: (hobbyId: string) => Promise<boolean>;
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
      className="cursor-pointer rounded-sm border border-[#C9B98C] bg-[#FBF6E9] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-3xl font-bold text-[#08060D]"
          >
            {hobby.name}
          </h2>

          <p className="mt-2 text-sm text-[#6B6375]">{hobby.description}</p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-md px-3 py-1 text-sm text-[#B5495B] hover:bg-[#B5495B]/10"
        >
          Delete
        </button>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-[#6B6375]">Progress</span>

          <span className="font-medium text-[#08060D]">{hobby.progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#E4D8BC]">
          <div
            className="h-full rounded-full bg-[#8A7A56]"
            style={{ width: `${hobby.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex justify-between text-sm text-[#6B6375]">
        <span>Goal: {hobby.goal || "No goal"}</span>

        <span>🔥 {hobby.currentStreak} days</span>
      </div>
    </div>
  );
};
