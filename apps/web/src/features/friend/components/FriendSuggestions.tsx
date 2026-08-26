import type { FriendSuggestionsProps } from "../types";
import { FriendSuggestionCard } from "./FriendSuggestionCard";

export const FriendSuggestions = ({
  users,
  addFriend,
}: FriendSuggestionsProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-8 text-center">
        <p className="text-[#E8EBF0]">No suggestions right now.</p>

        <p className="mt-2 text-sm text-[#9199A6]">
          Check back later for people you might connect with.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">
          People you may know
        </h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          Connect with people who share your space.
        </p>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <FriendSuggestionCard
            key={user.id}
            user={user}
            addFriend={addFriend}
          />
        ))}
      </div>
    </section>
  );
};
