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
    return <p className="text-[#9199A6]">Loading hobbies...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[#2C3038] bg-[#1C1F26] p-6"
    >
      <h2
        style={{ fontFamily: "'Fraunces', serif" }}
        className="text-2xl font-semibold text-[#ECEDF0]"
      >
        Add a hobby
      </h2>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-[#9199A6]">
          Hobby
        </label>

        <select
          value={hobbyTypeId}
          onChange={(event) => setHobbyTypeId(event.target.value)}
          className="w-full rounded-md border border-[#2C3038] bg-[#14161B] px-4 py-3 text-[#ECEDF0] outline-none focus:border-[#6E8CA0]"
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
        <label className="mb-2 block text-sm font-medium text-[#9199A6]">
          Goal
        </label>

        <input
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="What do you want to achieve?"
          className="w-full rounded-md border border-[#2C3038] bg-[#14161B] px-4 py-3 text-[#ECEDF0] placeholder:text-[#5F6672] outline-none focus:border-[#6E8CA0]"
        />
      </div>

      {error && <p className="mt-4 text-sm text-[#C97880]">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-md bg-[#6E8CA0] px-5 py-3 font-medium text-[#14161B] transition hover:bg-[#89A8BC] disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Hobby"}
      </button>
    </form>
  );
};
