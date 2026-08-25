import type { Analysis, GoalAnalysis } from "../types";

interface HobbyAnalysisProps {
  analysis: Analysis;
}

export const HobbyAnalysis = ({ analysis }: HobbyAnalysisProps) => {
  if (!analysis) {
    return (
      <div className="rounded-md border border-dashed border-[#2C3038] p-6">
        <p className="text-[#9199A6]">No analysis available yet.</p>
      </div>
    );
  }

  const hasGoal = "goal" in analysis;

  const statusLabel = analysis.status.replaceAll("_", " ");

  const trendLabel = analysis.trend.replaceAll("_", " ");

  return (
    <section className="rounded-md border border-[#2C3038] bg-[#1C1F26] p-6">
      <h2
        style={{ fontFamily: "'Fraunces', serif" }}
        className="text-2xl font-semibold text-[#ECEDF0]"
      >
        Progress Analysis
      </h2>

      {hasGoal && (
        <div className="mt-5">
          <p className="text-sm text-[#9199A6]">Goal</p>

          <p className="mt-1 text-lg text-[#ECEDF0]">
            {(analysis as GoalAnalysis).goal}
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-md border border-[#2C3038] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Progress</p>

          <p className="mt-1 text-2xl font-semibold text-[#ECEDF0]">
            {analysis.currentProgress}%
          </p>
        </div>

        <div className="rounded-md border border-[#2C3038] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Streak</p>

          <p className="mt-1 text-2xl font-semibold text-[#ECEDF0]">
            {analysis.currentStreak}
          </p>
        </div>

        <div className="rounded-md border border-[#2C3038] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Trend</p>

          <p className="mt-1 text-lg font-semibold text-[#ECEDF0]">
            {trendLabel}
          </p>
        </div>

        <div className="rounded-md border border-[#2C3038] bg-[#14161B] p-4">
          <p className="text-xs text-[#9199A6]">Status</p>

          <p className="mt-1 text-lg font-semibold text-[#ECEDF0]">
            {statusLabel}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-[#9199A6]">Improvement</p>

        <p className="mt-1 text-xl font-semibold text-[#ECEDF0]">
          {analysis.improvement}%
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-[#9199A6]">Average Progress Change</p>

        <p className="mt-1 text-xl font-semibold text-[#ECEDF0]">
          {analysis.averageProgressChange.toFixed(2)}
        </p>
      </div>

      {"consistency" in analysis && (
        <div className="mt-6">
          <p className="text-sm text-[#9199A6]">Consistency</p>

          <p className="mt-1 text-xl font-semibold text-[#ECEDF0]">
            {analysis.consistency}%
          </p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-medium text-[#ECEDF0]">Progress History</h3>

        {analysis.history.length === 0 ? (
          <p className="mt-3 text-sm text-[#9199A6]">
            No progress history yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {analysis.history.map((entry) => (
              <div
                key={entry.id}
                className="rounded-md border border-[#2C3038] p-4"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-[#ECEDF0]">
                    {entry.progress}%
                  </span>

                  <span
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    className="text-xs text-[#5F6672]"
                  >
                    {new Date(entry.recordedAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#9199A6]">{entry.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
