import UserPic from "@/components/UserPic";
import { useRef } from "react";

const CrudExpandedReply = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex gap-x-4 p-3 py-4 justify-between items-center w-full border border-neutral-800">
      <div className="max-w-[40px]">
        <UserPic />
      </div>

      <div className=" flex items-center flex-grow">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          // value={inputVal}
          // onChange={handleInputChange}
          maxLength={240}
          rows={1}
          placeholder="Crud your reply!"
          className="w-full py-2 resize-none focus:outline-none focus:shadow-outline bg-black outline-none "
        />
      </div>

      <div className="p-1 px-3 rounded-full bg-[#9500FF]">
        <button>Reply</button>
      </div>
    </div>
  );
};

export default CrudExpandedReply;
