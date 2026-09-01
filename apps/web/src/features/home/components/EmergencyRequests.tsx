import type { EmergencyRequest, User } from "../types";

import { EmergencyRequestCard } from "./EmergencyRequestCard";

interface EmergencyRequestsProps {
  emergencies: EmergencyRequest[];

  myEmergency?: EmergencyRequest;

  role: User["role"];

  onAccept: (reqId: string) => void;

  onClose: (reqId: string) => void;

  onEscalate: (reqId: string) => void;
}

const sortByUrgency = (emergencies: EmergencyRequest[]) =>
  [...emergencies].sort((a, b) => {
    const weight = (status: string) =>
      status === "OPEN" ? 0 : status === "CLOSED" ? 2 : 1;

    return weight(a.status) - weight(b.status);
  });

export const EmergencyRequests = ({
  emergencies,

  myEmergency,

  role,

  onAccept,

  onClose,

  onEscalate,
}: EmergencyRequestsProps) => {
  const openCount = emergencies.filter((e) => e.status === "OPEN").length;

  return (
    <section>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-medium text-[#E8EBF0]">
            Emergency requests
          </h2>

          <p className="mt-1 text-sm text-[#9199A6]">
            {emergencies.length === 0
              ? "No active emergency requests."
              : "Active requests that may need your attention."}
          </p>
        </div>

        {openCount > 0 && (
          <span className="shrink-0 rounded-full bg-[#C97880]/15 px-2.5 py-1 text-xs font-medium text-[#D99298]">
            {openCount} open
          </span>
        )}
      </div>

      {emergencies.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#2A2E36] px-5 py-8 text-center">
          <p className="text-sm text-[#9199A6]">
            You&apos;re all caught up. New requests will show up here right
            away.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortByUrgency(emergencies).map((emergency) => (
            <div
              key={emergency.id}
              className={
                myEmergency?.id === emergency.id
                  ? "rounded-lg border border-[#C97880]/40 bg-[#C97880]/10"
                  : ""
              }
            >
              <EmergencyRequestCard
                emergency={emergency}
                role={role}
                onAccept={onAccept}
                onClose={onClose}
                onEscalate={onEscalate}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
