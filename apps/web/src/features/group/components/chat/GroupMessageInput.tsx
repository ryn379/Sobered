import { useState } from "react";

interface GroupMessageInputProps {
  onSend: (content: string) => Promise<unknown>;
}

export const GroupMessageInput = ({ onSend }: GroupMessageInputProps) => {
  const [content, setContent] = useState("");

  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent || sending) return;

    try {
      setSending(true);

      await onSend(trimmedContent);

      setContent("");
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#2A2E36] bg-[#1C1F26] p-4"
    >
      <div className="flex items-center gap-3">
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Message the group..."
          className="flex-1 rounded-full border border-[#2A2E36] bg-[#252932] px-5 py-3 text-sm text-[#E8EBF0] outline-none placeholder:text-[#9199A6] focus:border-[#C97880]/60"
        />

        <button
          type="submit"
          disabled={!content.trim() || sending}
          className="rounded-full bg-[#C97880] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#D99298] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "..." : "Send"}
        </button>
      </div>
    </form>
  );
};
