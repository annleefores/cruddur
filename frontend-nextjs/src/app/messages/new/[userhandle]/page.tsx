"use client";

import HeaderElem from "@/components/HeaderElem";
import React from "react";
import ChatPage from "../../components/ChatPage";
import { HiOutlineArrowLeft } from "react-icons/hi2";

import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();

  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={params.userhandle} />
      <div className="relative h-full w-full pt-14 sm:pt-0">
        <div
          onClick={() => router.back()}
          className="fixed  top-15 z-50 p-1 rounded-full w-fit ml-3 mt-2 cursor-pointer bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-neutral-800 hover:bg-neutral-600/50"
        >
          <HiOutlineArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <ChatPage />
      </div>
    </div>
  );
};

export default page;
