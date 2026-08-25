interface IntentionCardProps {
  intention: string;
}

export const IntentionCard = ({ intention }: IntentionCardProps) => {
  return (
    <div className="rounded-lg border border-[#2A2E36] bg-[#1C1F26] p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#9199A6]">
        Today's intention
      </p>

      <p
        style={{ fontFamily: "'Fraunces', serif" }}
        className="mt-2 text-lg font-medium leading-snug text-[#E8EBF0]"
      >
        {intention}
      </p>
    </div>
  );
};
