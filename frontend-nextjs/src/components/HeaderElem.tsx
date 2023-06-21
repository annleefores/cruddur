"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import ProfileSignOutButton from "./ProfileSignOutButton";
import React from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface HeaderElemProps {
  page?: string;
  selectedUser?: string;
  showHeaderWithArrow?: boolean;
}

const HeaderElem: React.FC<HeaderElemProps> = ({
  page,
  selectedUser,
  showHeaderWithArrow,
}) => {
  const router = useRouter();
  const ChatHeader = (
    <div className="flex sm:hidden  flex-row gap-x-4 font-bold text-lg items-center py-1">
      <div
        onClick={() => router.push("/messages")}
        className="p-1 rounded-full w-fit cursor-pointer bg-neutral-800/50 hover:bg-neutral-600/50"
      >
        <HiOutlineArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="inline-flex gap-x-4">
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
          <ProfileSignOutButton />
        </div>
        <div className="w-fit truncate">
          <p>{selectedUser}</p>
        </div>
      </div>
    </div>
  );
  const PostHeader = (
    <div className="flex flex-row gap-x-4 font-bold text-lg items-center py-1 w-full">
      <div
        onClick={() => router.back()}
        className="p-1 rounded-full w-fit cursor-pointer bg-neutral-800/50 hover:bg-neutral-600/50"
      >
        <HiOutlineArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="w-fit truncate">
          <p>Crud</p>
        </div>
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
          <ProfileSignOutButton />
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed sm:sticky top-0 left-0 z-50 w-full py-2 px-4 bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-neutral-800">
      <div className="flex flex-row justify-between items-center h-6">
        {selectedUser || showHeaderWithArrow ? (
          <>
            {selectedUser ? (
              <>
                <p className="hidden sm:block text-lg font-bold truncate">
                  {selectedUser}
                </p>
                {ChatHeader}
              </>
            ) : (
              <>{PostHeader}</>
            )}
          </>
        ) : (
          <>
            <h1 className="hidden sm:block text-lg sm:text-xl font-bold h-fit">
              {page}
            </h1>
            <Link href="/home" className="block sm:hidden">
              <div className=" w-full max-h-[32px] max-w-[32px]  rounded-full xl:mx-2">
                <Image
                  src={logo}
                  alt="cruddur-logo"
                  priority
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="block sm:hidden h-fit truncate">
              <h1 className=" text-lg sm:text-xl font-bold h-fit">{page}</h1>
            </div>
            {page === "Explore" ? (
              <></>
            ) : (
              <>
                <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
                  <ProfileSignOutButton />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderElem;
