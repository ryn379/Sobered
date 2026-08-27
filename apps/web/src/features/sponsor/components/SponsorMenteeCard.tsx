import type { SponsorMenteeCardProps } from "../types";

export const SponsorMenteeCard = ({ mentee }: SponsorMenteeCardProps) => {
  //   const initial = mentee.username.charAt(0).toUpperCase();
  const displayUsername = mentee.username?.split("_")[0];

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {displayUsername}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{mentee.username}</p>

          <p className="mt-1 text-xs text-[#9199A6]">{mentee.email}</p>
        </div>
      </div>

      <span className="rounded-full border border-[#6E8CA0]/30 bg-[#6E8CA0]/10 px-3 py-1 text-xs text-[#AFC0CC]">
        Mentee
      </span>
    </div>
  );
};
