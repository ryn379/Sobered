import type { RecovererCardProps } from "../types";

export const RecovererCard = ({
  user,
  selected,
  onClick,
}: RecovererCardProps) => {
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <button
      type="button"
      onClick={() => onClick(user)}
      className={`w-full rounded-lg border p-5 text-left transition ${
        selected
          ? "border-[#6E8CA0] bg-[#20252D]"
          : "border-[#2A2E36] bg-[#1C1F26] hover:border-[#3A424D]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {initial}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{user.username}</p>

          <p className="mt-1 text-xs text-[#9199A6]">{user.email}</p>
        </div>
      </div>
    </button>
  );
};
