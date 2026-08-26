import type { FriendListProps } from "../types";
import { FriendCard } from "./FriendCard";

export const FriendList = ({ friends, onRemove }: FriendListProps) => {
  if (friends.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] px-6 py-12 text-center">
        <p className="text-[#E8EBF0]">You don't have any friends yet.</p>

        <p className="mt-2 text-sm text-[#9199A6]">
          Check your suggestions to find people to connect with.
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-medium text-[#E8EBF0]">Your Friends</h2>

      <div className="space-y-3">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} onRemove={onRemove} />
        ))}
      </div>
    </section>
  );
};
