import type { FriendSuggestionCardProps } from "../types";

export const FriendSuggestionCard = ({
  user,
  addFriend,
}: FriendSuggestionCardProps) => {
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {initial}
        </div>
        <div>
          <p className="font-medium text-[#E8EBF0]">{user.username}</p>

          <p className="mt-1 text-xs text-[#9199A6]">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => addFriend(user.id)}
        className="rounded-md bg-[#6E8CA0] px-4 py-2 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE]"
      >
        Add Friend
      </button>
    </div>
  );
};
