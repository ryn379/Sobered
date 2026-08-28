import type { User } from "../types";

interface SponsorCardProps {
  sponsor: User | User[];
  availability?: string;
  phone?: string;
}

export const SponsorCard = ({
  sponsor,
  availability,
  phone,
}: SponsorCardProps) => {
  if (Array.isArray(sponsor)) {
    return (
      <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6">
        <p className="text-[#E8EBF0]">No Sponsor</p>
      </div>
    );
  }
  console.log(sponsor);
  const initial = sponsor.username.charAt(0).toUpperCase();

  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#9199A6]">
        Your sponsor
      </p>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#6E8CA0]/30 bg-[#14161B] text-sm font-semibold text-[#E8EBF0]">
          {initial}
        </div>

        <div>
          <p className="font-medium text-[#E8EBF0]">{sponsor.username}</p>

          <p className="text-xs text-[#9199A6]">{sponsor.email}</p>
        </div>
      </div>

      {availability && (
        <p className="mt-4 text-sm text-[#9199A6]">Available {availability}</p>
      )}

      {phone ? (
        <a
          href={`tel:${phone}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#6E8CA0] px-4 py-2.5 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.6 10.8c1.4 2.7 3.7 5 6.4 6.4l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.1 2.1Z"
              fill="#14161B"
            />
          </svg>
          Call now
        </a>
      ) : (
        <a
          href={`mailto:${sponsor.email}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#6E8CA0] px-4 py-2.5 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE]"
        >
          Email {sponsor.username.split(" ")[0]}
        </a>
      )}
    </div>
  );
};
