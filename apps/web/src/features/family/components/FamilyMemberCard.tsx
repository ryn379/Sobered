import type { FamilyMemberCardProps } from "../types";

export const FamilyMemberCard = ({ user }: FamilyMemberCardProps) => {
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4 rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
        {initial}
      </div>

      <div>
        <p className="font-medium text-[#E8EBF0]">{user.username}</p>

        <p className="mt-1 text-xs text-[#9199A6]">{user.email}</p>
      </div>
    </div>
  );
};
