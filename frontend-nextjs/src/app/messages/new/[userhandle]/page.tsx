"use client";
import HeaderElem from "@/components/HeaderElem";
import React, { useEffect, useRef } from "react";
import ChatPage from "../../components/ChatPage";
import ChatInput from "../../components/ChatInput";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <div className="bg-black w-full ">
        <HeaderElem page={params.userhandle} />
        <div className="h-full w-full sm:pt-0 ">
          <ChatPage />
        </div>
      </div>
      <div>
        <ChatInput />
      </div>
    </div>
  );
};

export default page;
