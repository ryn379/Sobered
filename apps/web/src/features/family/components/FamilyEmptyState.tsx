import type { FamilyEmptyStateProps } from "../types";

export const FamilyEmptyState = ({ role }: FamilyEmptyStateProps) => {
  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
      <p className="text-[#E8EBF0]">No family connections yet</p>

      <p className="mt-2 text-sm text-[#9199A6]">
        {role === "RECOVERING_USER"
          ? "Connected family members will appear here."
          : "Connected recoverers will appear here."}
      </p>
    </div>
  );
};
