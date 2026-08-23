import { useEffect, useState } from "react";
import type { PredefinedHobby } from "../types";
import { getTypesHobby } from "../../../services/hobby.service";

interface HobbyFormProps {
  userId: string;
  onCreated: () => void;
}

export const HobbyForm = ({ userId, onCreated }: HobbyFormProps) => {
  const [types, setTypes] = useState<PredefinedHobby[]>([]);
  const [hobbyTypeId, setHobbyTypeId] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getTypesHobby();
        setTypes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hobbies");
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hobbyTypeId) {
      setError("Please choose a hobby");
      return;
    }

    if (!goal.trim()) {
      setError("Please enter a goal");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const { createHobby } = await import("../../../services/hobby.service");

      await createHobby(userId, hobbyTypeId, goal.trim());

      setHobbyTypeId("");
      setGoal("");

      onCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create hobby");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-[#6B6375]">Loading hobbies...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[#C9B98C] bg-[#FBF6E9] p-6"
    >
      <h2
        style={{ fontFamily: "'Caveat', cursive" }}
        className="text-3xl font-bold text-[#08060D]"
      >
        Add a hobby
      </h2>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-[#6B6375]">
          Hobby
        </label>

        <select
          value={hobbyTypeId}
          onChange={(event) => setHobbyTypeId(event.target.value)}
          className="w-full rounded-md border border-[#C9B98C] bg-[#FFFDF5] px-4 py-3 text-[#08060D] outline-none focus:border-[#8A7A56]"
        >
          <option value="">Choose a hobby</option>

          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-[#6B6375]">
          Goal
        </label>

        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="What do you want to achieve?"
          className="w-full rounded-md border border-[#C9B98C] bg-[#FFFDF5] px-4 py-3 text-[#08060D] outline-none focus:border-[#8A7A56]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-[#B5495B]">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-md bg-[#8A7A56] px-5 py-3 text-white disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Hobby"}
      </button>
    </form>
  );
};
