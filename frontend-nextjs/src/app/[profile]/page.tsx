"use client";

import HeaderElem from "@/components/HeaderElem";
import React from "react";

interface PageProps {
  params: {
    profile: string;
  };
}

const page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="bg-black w-full h-full">
      <HeaderElem page={"Profile"} />
    </div>
  );
};

export default page;
