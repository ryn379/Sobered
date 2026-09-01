import { useState } from "react";

import type { EmergencyRequest, EmergencyType } from "../types";

interface EmergencyButtonProps {
  emergency?: EmergencyRequest;
  onSubmit: (type: EmergencyType) => void;
  onClose: (reqId: string) => void;
}

export const EmergencyButton = ({
  emergency,
  onSubmit,
  onClose,
}: EmergencyButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (type: EmergencyType) => {
    onSubmit(type);
    setOpen(false);
  };

  const handleClose = () => {
    if (!emergency) return;

    onClose(emergency.id);
  };

  if (emergency) {
    return (
      <button
        type="button"
        onClick={handleClose}
        className="rounded-md border border-[#C97880]/40 bg-[#C97880]/10 px-4 py-2.5 text-sm font-medium text-[#C97880] transition hover:bg-[#C97880]/20"
      >
        Close Emergency
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md border border-[#C97880]/40 bg-[#C97880]/10 px-4 py-2.5 text-sm font-medium text-[#C97880] transition hover:bg-[#C97880]/20"
      >
        Emergency
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-2 shadow-lg">
          <p className="px-3 py-2 text-xs uppercase tracking-[0.15em] text-[#9199A6]">
            What do you need?
          </p>

          <button
            type="button"
            onClick={() => handleSelect("CRAVING")}
            className="w-full rounded-md px-3 py-2.5 text-left text-sm text-[#E8EBF0] transition hover:bg-[#252932]"
          >
            Craving
          </button>

          <button
            type="button"
            onClick={() => handleSelect("EMOTIONAL_SUPPORT")}
            className="w-full rounded-md px-3 py-2.5 text-left text-sm text-[#E8EBF0] transition hover:bg-[#252932]"
          >
            Emotional Support
          </button>
        </div>
      )}
    </div>
  );
};
