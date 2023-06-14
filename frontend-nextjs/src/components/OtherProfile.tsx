import React from "react";
import { twMerge } from "tailwind-merge";
import UserPic from "./UserPic";
import UserName from "./UserName";
import { useAuth } from "@/hooks/useAuth";

interface OtherProfileProps {
  name: string;
  handle: string;
}

const OtherProfile: React.FC<OtherProfileProps> = ({ name, handle }) => {
  return (
    // <Link href="#">
    <div className="flex flex-row items-center gap-x-2 w-full">
      <div className="w-full max-h-[40px] max-w-[40px] ">
        <UserPic />
      </div>
      <div>
        <UserName name={name} userhandle={handle} />
      </div>
    </div>
    // </Link>
  );
};

export default OtherProfile;
