"use client";

import React from "react";
import MessageComponent from "../components/MessageComponent";

interface PageProps {
  params: {
    uuid: string;
  };
}

const Home: React.FC<PageProps> = (props: PageProps) => {
  return (
    <>
      <div className="bg-[#02060E] h-full w-full">
        <MessageComponent Msg={false} uuid={props.params.uuid} />
      </div>
    </>
  );
};

export default Home;
