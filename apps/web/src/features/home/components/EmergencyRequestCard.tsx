import type { EmergencyRequest, User } from "../types";

interface EmergencyRequestCardProps {
  emergency: EmergencyRequest;
  role: User["role"];
  onAccept: (reqId: string) => void;
  onClose: (reqId: string) => void;
  onEscalate: (reqId: string) => void;
}

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const statusStyles: Record<
  string,
  { dot: string; text: string; accent: string }
> = {
  OPEN: { dot: "bg-[#C97880]", text: "text-[#D99298]", accent: "bg-[#C97880]" },
  ACCEPTED: {
    dot: "bg-[#6E8CA0]",
    text: "text-[#8FA8B8]",
    accent: "bg-[#6E8CA0]",
  },
  IN_PROGRESS: {
    dot: "bg-[#6E8CA0]",
    text: "text-[#8FA8B8]",
    accent: "bg-[#6E8CA0]",
  },
  ESCALATED: {
    dot: "bg-[#C97880]",
    text: "text-[#D99298]",
    accent: "bg-[#C97880]",
  },
  CLOSED: {
    dot: "bg-[#5A606B]",
    text: "text-[#9199A6]",
    accent: "bg-[#3A3F49]",
  },
};

const getStatusStyle = (status: string) =>
  statusStyles[status] ?? {
    dot: "bg-[#5A606B]",
    text: "text-[#9199A6]",
    accent: "bg-[#3A3F49]",
  };

export const EmergencyRequestCard = ({
  emergency,
  role,
  onAccept,
  onClose,
  onEscalate,
}: EmergencyRequestCardProps) => {
  const style = getStatusStyle(emergency.status);
  const isOpen = emergency.status === "OPEN";

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#2A2E36] bg-[#1C1F26] transition-colors hover:border-[#3A3F49]">
      <span
        className={`absolute inset-y-0 left-0 w-0.75 ${style.accent}`}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 p-5 pl-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-medium text-[#E8EBF0]">
            {formatLabel(emergency.type)}
          </p>

          <div className="mt-1.5 flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
              aria-hidden="true"
            />
            <span className={`text-xs ${style.text}`}>
              {formatLabel(emergency.status)}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {role !== "FAMILY_MEMBER" && isOpen && (
            <button
              type="button"
              onClick={() => onAccept(emergency.id)}
              className="rounded-md bg-[#6E8CA0] px-4 py-2 text-sm font-medium text-[#14161B] transition hover:bg-[#7F9BAE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E8CA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F26]"
            >
              Accept
            </button>
          )}

          {role !== "FAMILY_MEMBER" && (
            <button
              type="button"
              onClick={() => onClose(emergency.id)}
              className="rounded-md border border-[#3A3F49] px-4 py-2 text-sm text-[#C7CDD6] transition hover:border-[#5A606B] hover:text-[#E8EBF0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5A606B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F26]"
            >
              Close
            </button>
          )}

          {role === "PROFESSIONAL" && (
            <button
              type="button"
              onClick={() => onEscalate(emergency.id)}
              className="rounded-md border border-[#C97880]/40 px-4 py-2 text-sm text-[#C97880] transition hover:bg-[#C97880]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97880] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F26]"
            >
              Escalate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
