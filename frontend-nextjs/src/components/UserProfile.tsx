import Image from "next/image";
import user from "../../public/user.png";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface UserProfileProps {
  SignOutProfile?: boolean;
  ShowName?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  SignOutProfile,
  ShowName,
}) => {
  return (
    <Link href="#">
      <div className="flex flex-row items-center gap-x-2 w-full">
        <div className="w-full max-h-[40px] max-w-[40px] rounded-full bg-white">
          <Image
            src={user}
            alt="user-profile"
            priority
            className="object-cover"
          />
        </div>
        <div
          className={twMerge(
            `hidden  flex-col text-left `,
            SignOutProfile ? "xl:block" : "sm:block",
            ShowName && "block"
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
