"use client";
import HeaderElem from "@/components/HeaderElem";
import Link from "next/link";
import UserListBox from "./UserListBox";
import React, { useEffect, useState, useRef } from "react";
import ChatPage from "./ChatPage";
import ChatInput from "./ChatInput";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { MsgGrp } from "@/interfaces/type";
import useSWR from "swr";
import { Authfetcher } from "@/lib/fetcher";

// import { usePathname } from "next/navigation";
// import { isChat } from "@/lib/isChat";

interface MessageComponent {
  Msg: boolean;
  userhandle?: string;
}

const MessageComponent: React.FC<MessageComponent> = ({ Msg, userhandle }) => {
  const [selectedUser, setSelectedUser] = useState("");
  // const scrollRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message_groups`;
  const token = user.accessToken;

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    setSelectedUser(userhandle || "");
  }, [userhandle]);

  const { data, error, isLoading, mutate } = useSWR<MsgGrp[]>(
    [url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
    // { refreshInterval: 100 }
  );

  if (error) console.log(error);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="flex flex-row sm:gap-1 h-full w-full">
      {/* Chat user list  */}
      <div
        className={twMerge(
          "bg-[#02060E] w-6/12 h-full overflow-y-scroll no-scrollbar  border-r border-neutral-800",
          !Msg && "hidden sm:block"
        )}
      >
        <HeaderElem page={"Messages"} />

        <div className="h-full  ">
          <div className="w-full">
            {data?.map((user, index) => (
              <Link
                scroll={false}
                key={index}
                href={`/messages/new/${user.handle}`}
              >
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
      <div className="flex-grow h-full w-9/12">
        {Msg ? (
          <div
            className={twMerge(
              "hidden sm:block bg-[#02060E] w-full h-full p-4",
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
              "hidden sm:block h-full w-full bg-[#02060E]",
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
                </div>
                <div ref={chatContainerRef} />
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
