import type { RecovererListProps } from "../types";
import { RecovererCard } from "./RecovererCard";

export const RecovererList = ({
  recoverers,
  selectedRecoverer,
  onRecovererClick,
}: RecovererListProps) => {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">Recoverers</h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          Select a recoverer to view their sobriety progress.
        </p>
      </div>

      <div className="space-y-3">
        {recoverers.map((user) => (
          <RecovererCard
            key={user.id}
            user={user}
            selected={selectedRecoverer?.id === user.id}
            onClick={onRecovererClick}
          />
        ))}
      </div>
    </section>
  );
};
