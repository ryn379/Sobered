import { useState } from "react";

interface HobbyProgressFormProps {
  onSubmit: (progress: number, note: string) => Promise<void>;
}

export const HobbyProgressForm = ({ onSubmit }: HobbyProgressFormProps) => {
  const [progress, setProgress] = useState(0);
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (progress < 0 || progress > 100) {
      setError("Progress must be between 0 and 100.");
      return;
    }

    if (!note.trim()) {
      setError("Please describe your progress.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await onSubmit(progress, note.trim());

      setNote("");
    } catch (err) {
      console.error(err);
      setError("Failed to update progress.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[#2C3038] bg-[#1C1F26] p-6"
    >
      <h2
        style={{ fontFamily: "'Fraunces', serif" }}
        className="text-2xl font-semibold text-[#ECEDF0]"
      >
        Update Progress
      </h2>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between">
          <label
            htmlFor="progress"
            className="text-sm font-medium text-[#9199A6]"
          >
            Progress
          </label>

          <span className="font-semibold text-[#ECEDF0]">{progress}%</span>
        </div>

        <input
          id="progress"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => setProgress(Number(event.target.value))}
          disabled={loading}
          className="mt-3 w-full accent-[#6E8CA0]"
        />
      </div>

      {/* Note */}
      <div className="mt-6">
        <label
          htmlFor="progress-note"
          className="mb-2 block text-sm font-medium text-[#9199A6]"
        >
          What did you do?
        </label>

        <textarea
          id="progress-note"
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          disabled={loading}
          placeholder="I practiced programming for 45 minutes..."
          className="w-full resize-none rounded-md border border-[#2C3038] bg-[#14161B] px-4 py-3 text-[#ECEDF0] placeholder:text-[#5F6672] outline-none focus:border-[#6E8CA0]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-[#C97880]">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-md bg-[#6E8CA0] px-5 py-3 font-medium text-[#14161B] transition hover:bg-[#89A8BC] disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Progress"}
      </button>
    </form>
  );
};
