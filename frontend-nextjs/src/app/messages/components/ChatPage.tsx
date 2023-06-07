"use client";
import ChatBubble from "./ChatBubble";
import { messages } from "@/lib/data";
import React, { useEffect, useRef } from "react";

const ChatPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, chatContainerRef.current?.scrollHeight || 0);
  }, []);

  return (
    <div ref={chatContainerRef} className="overflow-y-scroll no-scrollbar ">
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
      {/* <div ref={chatContainerRef} /> */}
      <div className="h-16"> </div>
    </div>
  );
};

export default ChatPage;
