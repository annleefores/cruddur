"use client";

import HeaderElem from "@/components/HeaderElem";
import React from "react";
import Profile from "./components/Profile";
import ProfilePage from "./components/ProfilePage";

interface PageProps {
  params: {
    profile: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Profile"} />
      <div className="h-full w-full">
        <ProfilePage />
      </div>
    </div>
  );
};

export default page;
