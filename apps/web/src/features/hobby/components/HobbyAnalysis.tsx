import type { Analysis, GoalAnalysis } from "../types";

interface HobbyAnalysisProps {
  analysis: Analysis;
}

export const HobbyAnalysis = ({ analysis }: HobbyAnalysisProps) => {
  if (!analysis) {
    return (
      <div className="rounded-sm border border-dashed border-[#C9B98C] p-6">
        <p className="text-[#6B6375]">No analysis available yet.</p>
      </div>
    );
  }

  const hasGoal = "goal" in analysis;

  const statusLabel = analysis.status.replaceAll("_", " ");

  const trendLabel = analysis.trend.replaceAll("_", " ");

  return (
    <section className="rounded-sm border border-[#C9B98C] bg-[#FBF6E9] p-6">
      <h2
        style={{ fontFamily: "'Caveat', cursive" }}
        className="text-3xl font-bold text-[#08060D]"
      >
        Progress Analysis
      </h2>

      {hasGoal && (
        <div className="mt-5">
          <p className="text-sm text-[#6B6375]">Goal</p>

          <p className="mt-1 text-lg text-[#08060D]">
            {(analysis as GoalAnalysis).goal}
          </p>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-md bg-[#F3EAD6] p-4">
          <p className="text-xs text-[#6B6375]">Progress</p>

          <p className="mt-1 text-2xl font-semibold text-[#08060D]">
            {analysis.currentProgress}%
          </p>
        </div>

        <div className="rounded-md bg-[#F3EAD6] p-4">
          <p className="text-xs text-[#6B6375]">Streak</p>

          <p className="mt-1 text-2xl font-semibold text-[#08060D]">
            {analysis.currentStreak}
          </p>
        </div>

        <div className="rounded-md bg-[#F3EAD6] p-4">
          <p className="text-xs text-[#6B6375]">Trend</p>

          <p className="mt-1 text-lg font-semibold text-[#08060D]">
            {trendLabel}
          </p>
        </div>

        <div className="rounded-md bg-[#F3EAD6] p-4">
          <p className="text-xs text-[#6B6375]">Status</p>

          <p className="mt-1 text-lg font-semibold text-[#08060D]">
            {statusLabel}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-[#6B6375]">Improvement</p>

        <p className="mt-1 text-xl font-semibold text-[#08060D]">
          {analysis.improvement}%
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-[#6B6375]">Average Progress Change</p>

        <p className="mt-1 text-xl font-semibold text-[#08060D]">
          {analysis.averageProgressChange.toFixed(2)}
        </p>
      </div>

      {"consistency" in analysis && (
        <div className="mt-6">
          <p className="text-sm text-[#6B6375]">Consistency</p>

          <p className="mt-1 text-xl font-semibold text-[#08060D]">
            {analysis.consistency}%
          </p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="font-medium text-[#08060D]">Progress History</h3>

        {analysis.history.length === 0 ? (
          <p className="mt-3 text-sm text-[#6B6375]">
            No progress history yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {analysis.history.map((entry) => (
              <div
                key={entry.id}
                className="rounded-md border border-[#E4D8BC] p-4"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-[#08060D]">
                    {entry.progress}%
                  </span>

                  <span className="text-xs text-[#6B6375]">
                    {new Date(entry.recordedAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#6B6375]">{entry.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
