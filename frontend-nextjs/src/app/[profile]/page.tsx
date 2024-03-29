"use client";

import HeaderElem from "@/components/HeaderElem";
import React from "react";
import ProfilePage from "./components/ProfilePage";

interface PageProps {
  params: {
    profile: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="bg-[#02060E] w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Profile"} />
      <div className="w-full">
        <ProfilePage />
      </div>
    </div>
  );
};

export default page;
