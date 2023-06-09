"use client";

import { useRef } from "react";
import { IoSend } from "react-icons/io5";

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className=" bg-black p-1">
      <div className="flex flex-row items-center gap-x-2 rounded-lg bg-gray-800 mx-1 my-2">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          // value={inputVal}
          // onChange={handleInputChange}
          rows={1}
          placeholder="Send a new message"
          className="w-full px-2 py-1 resize-none rounded-lg focus:outline-none focus:shadow-outline bg-gray-800 outline-none m-1 "
        />
        <div className="mx-2">
          <IoSend size={26} />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
