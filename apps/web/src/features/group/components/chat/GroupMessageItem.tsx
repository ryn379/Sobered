import type { GroupMessage } from "../../types.ts";

interface GroupMessageItemProps {
  message: GroupMessage;

  currentUserId: string;

  anonymousName: string;
}

export const GroupMessageItem = ({
  message,
  currentUserId,
  anonymousName,
}: GroupMessageItemProps) => {
  const isOwnMessage = message.userId === currentUserId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        {!isOwnMessage && (
          <p className="mb-1 ml-1 text-xs font-medium text-[#9199A6]">
            {anonymousName}
          </p>
        )}

        <div
          className={`rounded-2xl px-4 py-3 ${
            isOwnMessage
              ? "rounded-br-sm bg-[#C97880] text-white"
              : "rounded-bl-sm bg-[#252932] text-[#E8EBF0]"
          }`}
        >
          <p className="wrap-break-word text-sm leading-6">{message.content}</p>

          <p
            className={`mt-1 text-right text-[11px] ${
              isOwnMessage ? "text-white/70" : "text-[#9199A6]"
            }`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
