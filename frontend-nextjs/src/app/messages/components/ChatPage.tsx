"use client";
import ChatBubble from "./ChatBubble";
import { messages } from "@/lib/data";
import React, { useEffect, useRef } from "react";

const ChatPage = () => {
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
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            text={message.text}
            isUser={message.isUser}
            previousIsUser={index > 0 ? messages[index - 1].isUser : false}
          />
        ))}
      </div>
      {/* <div ref={chatContainerEndRef} /> */}
      <div id="scroll" className="h-16" />
    </>
  );
};

export default ChatPage;
