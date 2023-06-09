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
      <div className="flex-grow h-full">
        {Msg ? (
          <div
            className={twMerge(
              "hidden sm:block bg-black w-full h-full p-4",
              !Msg && "block"
            )}
          >
            <div className="flex flex-col  items-center justify-center h-full w-full">
              <p className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-200">
                Select a message
              </p>
              <p className="text-center text-lg font-semibold leading-9 tracking-tight text-gray-500">
                Choose from your existing conversations or start a new one
              </p>
            </div>
          </div>
        ) : (
          <div
            className={twMerge(
              "hidden sm:block h-full w-full bg-black",
              !Msg && "block "
            )}
          >
            <div className="flex flex-col h-full w-full">
              <div className="overflow-y-scroll no-scrollbar h-full">
                <div>
                  <HeaderElem page={"Chat"} selectedUser={selectedUser} />
                  <div>
                    <ChatPage />
                  </div>
                  <div ref={chatContainerRef} />
                </div>
              </div>
              <div>
                <ChatInput />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageComponent;
