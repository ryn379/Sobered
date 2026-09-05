import type { Group } from "../types";

import { GroupCard } from "./GroupCard";

interface GroupsListProps {
  groups: Group[];
  onOpen: (groupId: string) => void;
  onLeave: (groupId: string) => void;
}

export const GroupsList = ({ groups, onOpen, onLeave }: GroupsListProps) => {
  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#2A2E36] px-5 py-10 text-center">
        <p className="text-sm text-[#9199A6]">
          You have not joined any groups yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onOpen={onOpen}
          onLeave={onLeave}
        />
      ))}
    </div>
  );
};
