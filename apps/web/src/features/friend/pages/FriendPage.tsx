import { useState } from "react";
import { FriendList } from "../components/FriendList.tsx";
import { FriendRequests } from "../components/FriendRequests.tsx";
import { useFriend } from "../hooks/useFriend.ts";
import type { UserProps } from "../types.ts";
import type { FriendTab } from "../types.ts";
import { FriendHeader } from "../components/FriendHeader.tsx";
import { FriendSuggestions } from "../components/FriendSuggestions.tsx";

export const FriendPage = ({ userId }: UserProps) => {
  const [active, setActive] = useState<FriendTab>("friends");

  const {
    friends,
    requests,
    suggestions,
    loading,
    error,
    addFriend,
    acceptRequest,
    declineRequest,
    removeFriend,
    refetch,
  } = useFriend(userId);

  const handleAccept = async (requesterId: string) => {
    await acceptRequest(requesterId);

    refetch();

    setActive("friends");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#C97880]">{error.message}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#14161B]">
      <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
        <FriendHeader
          active={active}
          onTabChange={setActive}
          requestCount={requests.length}
        />

        <div className="mt-8">
          {active === "friends" && (
            <FriendList friends={friends} onRemove={removeFriend} />
          )}
          {active === "requests" && (
            <FriendRequests
              requests={requests}
              handleAccept={handleAccept}
              onDecline={declineRequest}
            />
          )}

          {active === "suggestions" && (
            <FriendSuggestions users={suggestions} addFriend={addFriend} />
          )}
        </div>
      </div>
    </main>
  );
};
