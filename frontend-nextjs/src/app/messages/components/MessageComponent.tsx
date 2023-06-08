"use client";

import HeaderElem from "@/components/HeaderElem";
import { users } from "@/lib/data";
import Link from "next/link";
import UserListBox from "./UserListBox";
import React, { useEffect, useState, useRef } from "react";
import ChatPage from "./ChatPage";
import ChatInput from "./ChatInput";
import { twMerge } from "tailwind-merge";

// import { usePathname } from "next/navigation";
// import { isChat } from "@/lib/isChat";

interface MessageComponent {
  Msg: boolean;
  userhandle?: string;
}

const MessageComponent: React.FC<MessageComponent> = ({ Msg, userhandle }) => {
  const [selectedUser, setSelectedUser] = useState("");

  // auto scroll not working probably because there's another y scroll
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   console.log(chatContainerRef.current?.scrollHeight);
  //   window.scrollTo(0, chatContainerRef.current?.scrollHeight || 0);
  // }, []);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    setSelectedUser(userhandle || "");
  }, [userhandle]);

  return (
    <div className="flex flex-row gap-1 h-full w-full">
      {/* Chat user list  */}
      <div
        className={twMerge(
          "bg-black w-screen sm:w-[360px] h-full overflow-y-scroll no-scrollbar  border-r border-neutral-800",
          !Msg && "hidden sm:block"
        )}
      >
        <HeaderElem page={"Messages"} />

        <div className="h-full pt-14 sm:pt-0 ">
          <div className="w-full">
            {users.map((user, index) => (
              <Link key={index} href={`/messages/new/${user.userhandle}`}>
                <div
                  className="p-3 py-5  h-full hover:bg-neutral-900
          border-b border-neutral-800 transition cursor-pointer"
                >
                  <UserListBox {...user} />
                </div>
              </Link>
            ))}
            <div className="h-16"> </div>
          </div>
        </div>
      </div>
      {/* Chat */}
      <div
        className={twMerge(
          "hidden sm:block flex-grow overflow-y-scroll no-scrollbar bg-black",
          !Msg && "block "
        )}
      >
        {Msg ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <p className="text-3xl font-bold">Select a message</p>
            <p className="text-neutral-500">
              Choose from your existing conversations or start a new one
            </p>
          </div>
        ) : (
          <>
            <HeaderElem page={"Chat"} selectedUser={selectedUser} />
            <div>
              <ChatPage />
            </div>
            <div ref={chatContainerRef} />
            <div className="fixed sm:sticky bottom-0 right-0 left-0">
              <ChatInput />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
