"use client";
import HeaderElem from "@/components/HeaderElem";
import React, { useEffect, useRef } from "react";
import ChatPage from "../../components/ChatPage";
import ChatInput from "../../components/ChatInput";
import MessageComponent from "../../components/MessageComponent";
import withAuth from "@/components/WithAuth";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = (props: PageProps) => {
  const { params } = props;
  return (
    <>
      <MessageComponent Msg={false} userhandle={params.userhandle} />
    </>
  );
};

export default withAuth(page);
