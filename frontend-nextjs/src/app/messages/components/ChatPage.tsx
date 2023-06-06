import ChatBubble from "./ChatBubble";
import { messages } from "@/lib/data";
import ChatInput from "./ChatInput";

const ChatPage = () => {
  return (
    <div className="mt-6">
      <div className="h-full">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            text={message.text}
            isUser={message.isUser}
            previousIsUser={index > 0 ? messages[index - 1].isUser : false}
          />
        ))}
      </div>
      <div className="h-16"> </div>
      {/* <ChatInput /> */}
    </div>
  );
};

export default ChatPage;
