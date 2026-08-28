import type { User } from "../../home/types";

interface FamilyHeaderProps {
  role: User["role"];
}

export const FamilyHeader = ({ role }: FamilyHeaderProps) => {
  return (
    <header className="mb-8 border-b border-[#2A2E36] pb-6">
      <p className="text-xs uppercase tracking-[0.25em] text-[#6E8CA0]">
        Support
      </p>

      <h1 className="mt-2 text-3xl font-medium text-[#E8EBF0]">Family</h1>

      <p className="mt-2 max-w-xl text-sm text-[#9199A6]">
        {role === "RECOVERING_USER"
          ? "Stay connected with your family members."
          : "Stay connected with the people you support and keep track of their recovery progress."}
      </p>
    </header>
  );
};
