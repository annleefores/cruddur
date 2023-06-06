"use client";

import HeaderElem from "@/components/HeaderElem";
import React from "react";
import Profile from "./components/Profile";

interface PageProps {
  params: {
    profile: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  const ifPosts = false;
  return (
    <div className="bg-black w-full h-full">
      <HeaderElem page={"Profile"} />

      <div className="w-full pt-14 sm:pt-0 border-b border-neutral-800">
        <Profile />
      </div>
      <div>
        {ifPosts ? (
          <></>
        ) : (
          <div className="w-full text-center">
            <p className="text-sm text-neutral-500 p-4">
              Nothing to see here yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
