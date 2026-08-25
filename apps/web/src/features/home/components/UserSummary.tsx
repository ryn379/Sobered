import type { User } from "../types";

interface UserSummaryProps {
  user: User;
  note: string;
}

export const UserSummaryComponent = ({ user, note }: UserSummaryProps) => {
  const initial = user.username?.charAt(0).toUpperCase();

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#6E8CA0]/30 bg-[#1C1F26] text-lg font-semibold text-[#E8EBF0]">
        {initial}
      </div>

      <div>
        <p className="text-sm text-[#9199A6]">Welcome back,</p>

        <h2
          style={{ fontFamily: "'Fraunces', serif" }}
          className="text-3xl font-semibold leading-tight text-[#E8EBF0]"
        >
          {user.username}
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-[#9199A6]">{note}</p>
      </div>
    </div>
  );
};
