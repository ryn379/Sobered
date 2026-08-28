import type { SobrietyStatsCardProps } from "../types";

export const SobrietyStatsCard = ({
  recoverer,
  stats,
}: SobrietyStatsCardProps) => {
  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6E8CA0]">
          Recovery
        </p>

        <h2 className="mt-2 text-xl font-medium text-[#E8EBF0]">
          {recoverer.username}
        </h2>

        <p className="mt-1 text-sm text-[#9199A6]">Sobriety progress</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-[#2A2E36] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Current streak</p>

          <p className="mt-2 text-2xl font-medium text-[#E8EBF0]">
            {stats.currentStreak}
          </p>

          <p className="mt-1 text-xs text-[#9199A6]">days</p>
        </div>

        <div className="rounded-lg border border-[#2A2E36] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Longest streak</p>

          <p className="mt-2 text-2xl font-medium text-[#E8EBF0]">
            {stats.longestStreak}
          </p>

          <p className="mt-1 text-xs text-[#9199A6]">days</p>
        </div>

        <div className="rounded-lg border border-[#2A2E36] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Total meetings</p>

          <p className="mt-2 text-2xl font-medium text-[#E8EBF0]">
            {stats.totalMeetings}
          </p>
        </div>

        <div className="rounded-lg border border-[#2A2E36] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Start date</p>

          <p className="mt-2 text-sm font-medium text-[#E8EBF0]">
            {stats.startDate}
          </p>
        </div>
      </div>
    </div>
  );
};
