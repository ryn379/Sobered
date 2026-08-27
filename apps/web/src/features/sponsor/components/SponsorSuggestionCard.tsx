import type { SponsorSuggestionCardProps } from "../types";

export const SponsorSuggestionCard = ({
  user,
  onSendRequest,
}: SponsorSuggestionCardProps) => {
  //   const initial = user.username.charAt(0).toUpperCase();
  const displayUsername = user.username?.split("_")[0];

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {displayUsername}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{user.username}</p>

          <p className="mt-1 text-xs text-[#9199A6]">{user.email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSendRequest(user.id)}
        className="rounded-md bg-[#6E8CA0] px-4 py-2 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE]"
      >
        Send request
      </button>
    </div>
  );
};
