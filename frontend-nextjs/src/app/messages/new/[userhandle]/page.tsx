import HeaderElem from "@/components/HeaderElem";
import React from "react";
import ChatPage from "../../components/ChatPage";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={params.userhandle} />
      <div className="h-full w-full pt-14 sm:pt-0">
        <ChatPage />
      </div>
    </div>
  );
};

export default page;
