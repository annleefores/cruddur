import ChatBubble from "./ChatBubble";
import { messages } from "@/lib/data";

const ChatPage = () => {
  return (
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
  );
};

export default ChatPage;
