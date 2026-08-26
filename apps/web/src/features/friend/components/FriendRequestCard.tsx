import type { FriendRequestCardProps } from "../types";

export const FriendRequestCard = ({
  requester,
  onAccept,
  handleAccept,
  onDecline,
}: FriendRequestCardProps) => {
  const initial = requester.username.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {initial}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{requester.username}</p>

          <p className="text-xs text-[#9199A6]">Wants to connect with you</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            onAccept(requester.id);
            handleAccept(requester.id);
          }}
          className="rounded-md bg-[#6E8CA0] px-3 py-2 text-xs font-medium text-[#14161B]"
        >
          Accept
        </button>

        <button
          onClick={() => {
            onDecline(requester.id);
            handleAccept(requester.id);
          }}
          className="rounded-md border border-[#2A2E36] px-3 py-2 text-xs text-[#9199A6]"
        >
          Decline
        </button>
      </div>
    </div>
  );
};
