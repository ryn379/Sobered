import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GroupsList } from "../components/GroupsList";

import { useGroup } from "../hooks/useGroup";

interface GroupPageProps {
  userId: string;
}

const GroupPage = ({ userId }: GroupPageProps) => {
  const navigate = useNavigate();

  const { loading, error, groups, groupLeave } = useGroup(userId);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const handleOpenGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    navigate(`/groups/chat/${groupId}`);
  };

  const handleLeaveGroup = async (groupId: string) => {
    await groupLeave(groupId);

    if (selectedGroupId === groupId) {
      setSelectedGroupId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#9199A6]">Loading groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14161B]">
        <p className="text-sm text-[#C97880]">Failed to load groups.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14161B]">
      <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#E8EBF0]">My Groups</h1>

          <p className="mt-2 text-sm text-[#9199A6]">
            Connect with people who are walking the same path.
          </p>
        </div>

        <GroupsList
          groups={groups}
          onOpen={handleOpenGroup}
          onLeave={handleLeaveGroup}
        />
      </main>
    </div>
  );
};

export default GroupPage;
