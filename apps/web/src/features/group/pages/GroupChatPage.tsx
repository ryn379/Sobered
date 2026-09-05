import { useEffect, useState } from "react";

import type { Group, GroupMember } from "../types";

import type { User } from "../../home/types";

import { useGroup } from "../hooks/useGroup";

import { useGroupMessage } from "../hooks/useGroupMessage";

import { GroupChatHeader } from "../components/chat/GroupChatHeader";

import { GroupMessages } from "../components/chat/GroupMessages";

import { GroupMembersProfile } from "../components/chat/GroupMembersProfile";

import { GroupMessageInput } from "../components/chat/GroupMessageInput";

import { useNavigate, useParams } from "react-router-dom";

interface GroupChatPageProps {
  userId: string;
}

const GroupChatPage = ({ userId }: GroupChatPageProps) => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<
    { userMember: User; groupMember: GroupMember }[]
  >([]);
  const [showMembers, setShowMembers] = useState(false);
  const { groupGet, groupMembers } = useGroup(userId);
  const { loading, error, messages, sendMessage } = useGroupMessage(
    userId,
    groupId ?? "",
  );

  useEffect(() => {
    if (!groupId) return;

    const loadGroup = async () => {
      const groupData = await groupGet(groupId);
      if (groupData) {
        setGroup(groupData);
      }

      const membersData = await groupMembers(groupId);
      if (membersData) {
        setMembers(membersData);
      }
    };

    loadGroup();
  }, [groupId]);

  const handleFriendRequest = (friendId: string) => {
    console.log(`Send friend request from ${userId} to ${friendId}`);
  };

  if (loading || !group) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#C97880]">Failed to load chat.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#14161B]">
      <GroupChatHeader
        groupName={group.name}
        onBack={() => navigate("/groups")}
        onShowMembers={() => setShowMembers(true)}
      />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-5">
          <GroupMessages
            messages={messages}
            currentUserId={userId}
            members={members}
          />
        </div>

        <GroupMessageInput onSend={sendMessage} />
      </main>

      {showMembers && (
        <GroupMembersProfile
          members={members}
          currentUserId={userId}
          onClose={() => setShowMembers(false)}
          onFriendRequest={handleFriendRequest}
        />
      )}
    </div>
  );
};

export default GroupChatPage;
