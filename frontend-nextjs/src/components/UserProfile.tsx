import Image from "next/image";
import user from "../../public/user.png";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface UserProfileProps {
  SignOutProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ SignOutProfile }) => {
  return (
    <Link href="#">
      <div className="flex flex-row items-center gap-x-2 w-full">
        <div className="w-full sm:max-h-[40px] sm:max-w-[40px] rounded-full bg-white">
          <Image src={user} alt="user-profile" className="object-cover" />
        </div>
        <div
          className={twMerge(
            `hidden  flex-col text-left w-36`,
            SignOutProfile ? "xl:block" : "sm:block"
          )}
        >
          <p className="text-sm truncate hover:underline">Annlee Fores</p>
          <p className="text-xs truncate text-neutral-400">@annleefores</p>
        </div>
      </div>
    </Link>
  );
};

export default UserProfile;
