import type { User } from "../../../home/types";

interface GroupMembersProfileProps {
  members: { userMember: User }[];

  currentUserId: string;

  onClose: () => void;

  onFriendRequest: (userId: string) => void;
}

export const GroupMembersProfile = ({
  members,
  currentUserId,
  onClose,
  onFriendRequest,
}: GroupMembersProfileProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl border border-[#2A2E36] bg-[#1C1F26] shadow-xl">
        <div className="flex items-center justify-between border-b border-[#2A2E36] px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#E8EBF0]">
              Group members
            </h2>

            <p className="mt-1 text-sm text-[#9199A6]">
              {members.length} members
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-sm text-[#9199A6] hover:bg-[#252932]"
          >
            Close
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {members.map((member, index) => {
            const isCurrentUser = member.userMember.id === currentUserId;

            return (
              <div
                key={member.userMember.id}
                className="flex items-center justify-between gap-4 rounded-lg px-4 py-3 hover:bg-[#252932]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2A2E36] text-sm font-medium text-[#E8EBF0]">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#E8EBF0]">
                      User {index + 1}
                    </p>

                    {isCurrentUser && (
                      <p className="text-xs text-[#9199A6]">You</p>
                    )}
                  </div>
                </div>

                {!isCurrentUser && (
                  <button
                    type="button"
                    onClick={() => onFriendRequest(member.userMember.id)}
                    className="rounded-md border border-[#C97880]/40 bg-[#C97880]/10 px-3 py-2 text-xs font-medium text-[#C97880] transition hover:bg-[#C97880]/20"
                  >
                    Add friend
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
