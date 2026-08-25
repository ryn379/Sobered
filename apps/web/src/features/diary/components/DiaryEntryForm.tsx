import { useState } from "react";
import { entryDiary } from "../../../services/diary.service";

interface DiaryEntryFormProps {
  userId: string;
  onCreated: () => void;
}

export const DiaryEntryForm = ({ userId, onCreated }: DiaryEntryFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      await entryDiary(userId, title, content);

      setTitle("");
      setContent("");

      onCreated(); // refetch
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-md border border-[#2C3038] bg-[#1C1F26] p-6"
    >
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Entry title"
        style={{ fontFamily: "'Fraunces', serif" }}
        className="border-b border-[#2C3038] bg-transparent pb-2 text-lg font-medium text-[#ECEDF0] placeholder:text-[#5F6672] outline-none focus:border-[#6E8CA0]"
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your entry..."
        rows={4}
        className="resize-none rounded-md border border-[#2C3038] bg-[#14161B] p-3 text-[15px] leading-7 text-[#ECEDF0] placeholder:text-[#5F6672] outline-none focus:border-[#6E8CA0]"
      />

      <button
        type="submit"
        disabled={loading}
        className="self-end rounded-md bg-[#6E8CA0] px-5 py-2 text-sm font-medium text-[#14161B] transition hover:bg-[#89A8BC] disabled:cursor-not-allowed disabled:bg-[#3A3F4A] disabled:text-[#9199A6]"
      >
        {loading ? "Saving…" : "Save entry"}
      </button>
    </form>
  );
};
