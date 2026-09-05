interface GroupChatHeaderProps {
  groupName: string;

  onBack: () => void;

  onShowMembers: () => void;
}

export const GroupChatHeader = ({
  groupName,
  onBack,
  onShowMembers,
}: GroupChatHeaderProps) => {
  return (
    <header className="flex items-center gap-4 border-b border-[#2A2E36] bg-[#1C1F26] px-5 py-4">
      <button
        type="button"
        onClick={onBack}
        className="rounded-md px-3 py-2 text-sm text-[#9199A6] transition hover:bg-[#252932]"
      >
        ←
      </button>

      <button type="button" onClick={onShowMembers} className="text-left">
        <h1 className="text-base font-semibold text-[#E8EBF0]">{groupName}</h1>

        <p className="mt-0.5 text-xs text-[#9199A6]">Tap to view members</p>
      </button>
    </header>
  );
};
