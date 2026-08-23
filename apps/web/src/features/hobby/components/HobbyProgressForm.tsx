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
      className="rounded-lg border border-[#D8CCB5] bg-[#FBF6E9] p-6"
    >
      <h2 className="text-2xl font-semibold text-[#2F2A35]">Update Progress</h2>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between">
          <label
            htmlFor="progress"
            className="text-sm font-medium text-[#5B5B72]"
          >
            Progress
          </label>

          <span className="font-semibold text-[#2F2A35]">{progress}%</span>
        </div>

        <input
          id="progress"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(event) => setProgress(Number(event.target.value))}
          disabled={loading}
          className="mt-3 w-full"
        />
      </div>

      {/* Note */}
      <div className="mt-6">
        <label
          htmlFor="progress-note"
          className="mb-2 block text-sm font-medium text-[#5B5B72]"
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
          className="w-full resize-none rounded-md border border-[#C9B98C] bg-white px-4 py-3 text-[#2F2A35]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-[#B5495B]">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-md bg-[#5B5B72] px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Progress"}
      </button>
    </form>
  );
};
