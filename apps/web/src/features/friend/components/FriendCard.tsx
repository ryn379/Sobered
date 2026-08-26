import type { FriendCardProps } from "../types";

export const FriendCard = ({ friend, onRemove }: FriendCardProps) => {
  const initial = friend.username.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {initial}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{friend.username}</p>

          <p className="text-xs text-[#9199A6]">
            {friend.role.replace("_", " ")}
          </p>
        </div>
      </div>

      <button
        onClick={() => onRemove(friend.id)}
        className="rounded-md border border-[#2A2E36] px-3 py-2 text-xs text-[#9199A6] transition hover:border-[#C97880]/50 hover:text-[#C97880]"
      >
        Remove
      </button>
    </div>
  );
};
