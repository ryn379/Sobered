import type { SobrietySummary } from "../types";

interface SobrietySummaryProps {
  sobriety: SobrietySummary;
  nextMilestone: number;
}

export const SobrietySummaryComponent = ({
  sobriety,
  nextMilestone,
}: SobrietySummaryProps) => {
  const progress =
    nextMilestone > 0 ? Math.min(sobriety.currentStreak / nextMilestone, 1) : 0;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#9199A6]">
        Current streak
      </p>

      <div className="flex items-center gap-6">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            className="-rotate-90"
          >
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="#2A2E36"
              strokeWidth="6"
            />

            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="#6E8CA0"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span
              style={{ fontFamily: "'Fraunces', serif" }}
              className="text-2xl font-semibold leading-none text-[#E8EBF0]"
            >
              {sobriety.currentStreak}
            </span>

            <span className="mt-1 text-[10px] uppercase tracking-wide text-[#9199A6]">
              days
            </span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-[#9199A6]">Since {sobriety.startDate}</p>

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs text-[#9199A6]">
              <span>Next milestone</span>
              <span>{nextMilestone} days</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-[#2A2E36]">
              <div
                className="h-full rounded-full bg-[#6E8CA0]"
                style={{
                  width: `${progress * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#2A2E36] pt-4">
        <div>
          <p
            style={{ fontFamily: "'Fraunces', serif" }}
            className="text-xl font-semibold text-[#E8EBF0]"
          >
            {sobriety.longestStreak}
          </p>

          <p className="text-xs uppercase tracking-wide text-[#9199A6]">
            Longest streak
          </p>
        </div>

        <div>
          <p
            style={{ fontFamily: "'Fraunces', serif" }}
            className="text-xl font-semibold text-[#E8EBF0]"
          >
            {sobriety.totalDays}
          </p>

          <p className="text-xs uppercase tracking-wide text-[#9199A6]">
            Total days
          </p>
        </div>
      </div>
    </div>
  );
};
