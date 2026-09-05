import type { Group } from "../types";

interface GroupCardProps {
  group: Group;
  onOpen: (groupId: string) => void;
  onLeave: (groupId: string) => void;
}

export const GroupCard = ({ group, onOpen, onLeave }: GroupCardProps) => {
  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-[#E8EBF0]">{group.name}</h3>

          <p className="mt-2 text-sm leading-6 text-[#9199A6]">
            {group.description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onOpen(group.id)}
          className="rounded-md bg-[#E8EBF0] px-4 py-2 text-sm font-medium text-[#14161B] transition hover:bg-white"
        >
          Open Chat
        </button>

        <button
          type="button"
          onClick={() => onLeave(group.id)}
          className="rounded-md border border-[#C97880]/40 bg-[#C97880]/10 px-4 py-2 text-sm font-medium text-[#C97880] transition hover:bg-[#C97880]/20"
        >
          Leave
        </button>
      </div>
    </div>
  );
};
