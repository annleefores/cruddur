"use client";
import { message } from "@/interfaces/type";
import ChatBubble from "./ChatBubble";
import { messages } from "@/lib/data";
import React from "react";
import { useAuth } from "@/context/useAuth";

interface ChatPageProps {
  messages?: message[];
}

const ChatPage: React.FC<ChatPageProps> = ({ messages }) => {
  const { user } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const chatContainerRef = useRef<HTMLDivElement>(null);
  // const chatContainerEndRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   chatContainerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  // useEffect(() => {
  //   console.log(chatContainerRef.current?.scrollHeight);
  //   window.scrollTo(0, chatContainerRef.current?.scrollHeight || 0);
  // }, []);

  return (
    <>
      <div className="h-14 block sm:hidden" />
      <div className="h-full">
        {messages?.map((message, index) => (
          <ChatBubble
            key={index}
            text={message.message}
            createdAt={message.created_at}
            isUser={message.handle === user.preferred_username}
            previousIsUser={
              index > 0
                ? messages[index - 1].handle === user.preferred_username
                : false
            }
          />
        ))}
      </div>
      {/* <div ref={chatContainerEndRef} /> */}
      <div id="scroll" className="h-4" />
    </>
  );
};

export default ChatPage;
