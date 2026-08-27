import type { SponsorMenteesProps } from "../types";
import { SponsorMenteeCard } from "./SponsorMenteeCard";

export const SponsorMentees = ({ mentees }: SponsorMenteesProps) => {
  if (mentees.length === 0) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-10 text-center">
        <p className="text-[#E8EBF0]">No mentees yet.</p>

        <p className="mt-2 text-sm text-[#9199A6]">
          People you sponsor will appear here.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-medium text-[#E8EBF0]">Your mentees</h2>

        <p className="mt-1 text-sm text-[#9199A6]">
          People you are currently supporting.
        </p>
      </div>

      <div className="space-y-3">
        {mentees.map((mentee) => (
          <SponsorMenteeCard key={mentee.id} mentee={mentee} />
        ))}
      </div>
    </section>
  );
};
