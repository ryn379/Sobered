import type { FamilyMembersProps } from "../types";
import { FamilyMemberCard } from "./FamilyMemberCard";

export const FamilyMembers = ({ family }: FamilyMembersProps) => {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">Your family</h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          People connected to your recovery journey.
        </p>
      </div>

      <div className="space-y-3">
        {family.map((user) => (
          <FamilyMemberCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
};
