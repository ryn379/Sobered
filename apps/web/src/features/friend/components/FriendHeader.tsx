import type { FriendHeaderProps, FriendTab } from "../types";

export const FriendHeader = ({
  active,
  onTabChange,
  requestCount,
}: FriendHeaderProps) => {
  const tabs: {
    id: FriendTab;
    label: string;
  }[] = [
    { id: "friends", label: "Friends" },
    { id: "suggestions", label: "Suggestions" },
    { id: "requests", label: "Requests" },
  ];

  return (
    <header className="border-b border-[#2A2E36]">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6E8CA0]">
          Connections
        </p>

        <h1 className="mt-1 text-3xl font-medium text-[#E8EBF0]">Friends</h1>

        <p className="mt-2 text-sm text-[#9199A6]">
          Stay connected with people walking a similar path
        </p>
      </div>

      <nav className="flex gap-6">
        {tabs.map((tab) => {
          const activeTab = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative pb-4 text-sm transition ${
                activeTab
                  ? "text-[#E8EBF0]"
                  : "text-[#9199A6] hover:text-[#C8CDD5]"
              }`}
            >
              {tab.label}

              {tab.id === "requests" && requestCount > 0 && (
                <span className="ml-2 rounded-full bg-[#6E8CA0] px-2 py-0.5 text-[10px] font-semibold text-[#14161B]">
                  {requestCount}
                </span>
              )}

              {activeTab && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-red-700" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
