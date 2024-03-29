import React from "react";
import { twMerge } from "tailwind-merge";
import UserPic from "./UserPic";
import UserName from "./UserName";

interface OtherProfileProps {
  name: string;
  handle: string;
  sub: string;
}

const OtherProfile: React.FC<OtherProfileProps> = ({ name, handle, sub }) => {
  return (
    // <Link href="#">
    <div className="flex flex-row items-center gap-x-2 w-full">
      <div className="w-full max-h-[40px] max-w-[40px] ">
        <UserPic sub={sub} />
      </div>
      <div>
        <UserName name={name} userhandle={handle} />
      </div>
    </div>
    // </Link>
  );
};

export default OtherProfile;
