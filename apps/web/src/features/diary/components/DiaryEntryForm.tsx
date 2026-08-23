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

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      await entryDiary(userId, title, content);

      setTitle("");
      setContent("");

      onCreated(); //refetch
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-3 rounded-sm border border-[#D8C9A8] bg-[#FFFDF7] p-6 pl-8 shadow-sm"
    >
      <span className="absolute bottom-4 left-4 top-4 w-px bg-[#D98A93]" />

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Dear diary..."
        style={{ fontFamily: "'Caveat', cursive" }}
        className="border-b border-[#D8C9A8] bg-transparent pb-2 text-2xl text-[#2B2B3D] placeholder:text-[#B3A688] outline-none focus:border-[#8A7A56]"
      />

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Write your thoughts..."
        rows={4}
        className="resize-none bg-transparent font-serif text-[15px] leading-8 text-[#3A3A4D] placeholder:text-[#B3A688] outline-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 31px, #E4D8BC 32px)",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="self-end rounded-full bg-[#2B2B3D] px-5 py-2 text-sm font-medium tracking-wide text-[#F3EAD6] transition hover:bg-[#1c1c2b] disabled:cursor-not-allowed disabled:bg-[#8A8A99]"
      >
        {loading ? "Saving..." : "Save Entry ✒️"}
      </button>
    </form>
  );
};
