import { format_datetime, message_time_ago } from "@/lib/DateTimeFormat";
import React from "react";
import { twMerge } from "tailwind-merge";
import { IoCheckmarkDone } from "react-icons/io5";

interface ChatBubbleProps {
  text: string;
  isUser: boolean;
  previousIsUser: boolean;
  createdAt: string;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isUser,
  previousIsUser,
  createdAt,
}) => {
  // p-2 m-2   max-h-full w-10/12
  return (
    <div
      className={twMerge(
        "flex flex-col gap-0",
        isUser !== previousIsUser ? "mt-4" : ""
      )}
    >
      <div
        className={twMerge(
          `mx-2 py-3 px-4 w-fit max-w-xs break-words `,
          isUser
            ? "bg-violet-700 text-white ml-auto rounded-t-xl rounded-l-xl"
            : "bg-gray-800 rounded-t-xl rounded-r-xl"
        )}
      >
        <div>
          <p className="break-word text-sm">{text}</p>
        </div>
      </div>
      <div
        title={format_datetime(createdAt)}
        className={twMerge(
          `mx-2 mt-1 max-w-xs break-words `,
          isUser ? " text-white ml-auto " : ""
        )}
      >
        <div className="text-xs text-neutral-500 mb-1 ">
          {createdAt ? (
            <div className="inline-flex items-center gap-x-2">
              {message_time_ago(createdAt)}
              <IoCheckmarkDone className="text-neutral-500" size={14} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
