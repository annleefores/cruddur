"use client";
import HeaderElem from "@/components/HeaderElem";
import React, { useEffect, useRef } from "react";
import ChatPage from "../../components/ChatPage";
import ChatInput from "../../components/ChatInput";
import MessageComponent from "../../components/MessageComponent";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <>
      <MessageComponent Msg={false} userhandle={params.userhandle} />
    </>
  );
};

export default page;
