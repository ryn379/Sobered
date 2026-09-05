import type { GroupMessage } from "../../types";

import type { User } from "../../../home/types";

import { GroupMessageItem } from "./GroupMessageItem";

interface GroupMessagesProps {
  messages: GroupMessage[];

  currentUserId: string;

  members: { userMember: User }[];
}

export const GroupMessages = ({
  messages,
  currentUserId,
  members,
}: GroupMessagesProps) => {
  const getAnonymousName = (userId: string) => {
    const index = members.findIndex(
      (member) => member.userMember.id === userId,
    );

    if (index === -1) {
      return "Unknown User";
    }

    return `User ${index + 1}`;
  };

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-[#9199A6]">
          No messages yet. Start the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-1 py-4">
      {messages.map((message) => (
        <GroupMessageItem
          key={message.id}
          message={message}
          currentUserId={currentUserId}
          anonymousName={getAnonymousName(message.userId)}
        />
      ))}
    </div>
  );
};
