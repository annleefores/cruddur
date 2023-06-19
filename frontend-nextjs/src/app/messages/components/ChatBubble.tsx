import React from "react";
import { twMerge } from "tailwind-merge";

interface ChatBubbleProps {
  text: string;
  isUser: boolean;
  previousIsUser: boolean;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isUser,
  previousIsUser,
}) => {
  // p-2 m-2   max-h-full w-10/12
  return (
    <div
      className={twMerge(
        `m-2 py-3 px-4 max-w-xs break-words `,
        isUser
          ? "bg-violet-700 text-white ml-auto rounded-t-xl rounded-l-xl"
          : "bg-gray-800 rounded-t-xl rounded-r-xl",
        isUser !== previousIsUser ? "mt-8" : ""
      )}
    >
      <div>
        <p className="break-word text-sm">{text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
