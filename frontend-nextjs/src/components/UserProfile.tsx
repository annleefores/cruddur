import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import UserPic from "./UserPic";
import UserName from "./UserName";

interface UserProfileProps {
  SignOutProfile?: boolean;
  ShowName?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  SignOutProfile,
  ShowName,
}) => {
  return (
    // <Link href="#">
    <div className="flex flex-row items-center gap-x-2 w-full">
      <div className="w-full max-h-[40px] max-w-[40px] ">
        <UserPic />
      </div>
      <div
        className={twMerge(
          `hidden  flex-col text-left `,
          SignOutProfile ? "xl:block" : "sm:block",
          ShowName && "block"
        )}
      >
        <UserName />
      </div>
    </div>
    // </Link>
  );
};

export default UserProfile;
