import type { SponsorHeaderProps, SponsorTab } from "../types";

const tabs: { label: string; value: SponsorTab }[] = [
  { label: "Sponsor", value: "Sponsor" },
  { label: "Requests", value: "Requests" },
  { label: "Mentees", value: "Mentees" },
  { label: "Suggestions", value: "Suggestions" },
];

export const SponsorHeader = ({
  active,
  onChange,
  requestCount,
}: SponsorHeaderProps) => {
  return (
    <header className="border-b border-[#2A2E36]">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-[#6E8CA0]">
          Support
        </p>

        <h1 className="mt-2 text-3xl font-medium text-[#E8EBF0]">
          Sponsorship
        </h1>

        <p className="mt-2 max-w-xl text-sm text-[#9199A6]">
          Build a steady support system through sponsors, mentees, and trusted
          connections.
        </p>
      </div>

      <nav className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={`relative whitespace-nowrap pb-3 text-sm transition ${
                isActive
                  ? "text-[#E8EBF0]"
                  : "text-[#9199A6] hover:text-[#C7CDD6]"
              }`}
            >
              {tab.label}

              {tab.value === "Requests" && requestCount > 0 && (
                <span className="ml-2 rounded-full bg-[#6E8CA0]/20 px-2 py-0.5 text-xs text-[#AFC0CC]">
                  {requestCount}
                </span>
              )}

              {isActive && (
                <span className="absolute bottom-0 left-0 h-px w-full bg-[#6E8CA0]" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
