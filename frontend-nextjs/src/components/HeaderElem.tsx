"use client";

import Image from "next/image";
import logo from "../../public/logo.svg";
import ProfileSignOutButton from "./ProfileSignOutButton";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { isChat } from "@/lib/isChat";
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface HeaderElemProps {
  page: string;
}

const HeaderElem: React.FC<HeaderElemProps> = ({ page }) => {
  const username = "annleefores";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const pathname = usePathname();

  const ChatHeader = (
    <div className="flex flex-row gap-x-4 font-bold text-lg items-center py-1">
      <div
        onClick={() => router.back()}
        className="p-1 rounded-full w-fit cursor-pointer bg-neutral-800/50 hover:bg-neutral-600/50"
      >
        <HiOutlineArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="inline-flex gap-x-2">
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
          <ProfileSignOutButton />
        </div>
        <div className="w-fit">
          <p>{username}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed sm:sticky top-0 left-0 z-50 w-full py-2 px-4 bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-neutral-800">
      {/* Displays header for all pages except chat */}
      <div
        className={twMerge(
          "flex flex-row justify-between items-center",
          isChat(pathname) === "/messages/new" && "hidden"
        )}
      >
        <h1 className="hidden sm:block text-lg sm:text-xl font-bold h-fit">
          {page}
        </h1>
        <Link href="/" className="block sm:hidden">
          <div className=" w-full max-h-[32px] max-w-[32px] mb-2 rounded-full xl:mx-2">
            <Image
              src={logo}
              alt="cruddur-logo"
              priority
              className="object-cover"
            />
          </div>
        </Link>
        <div className="block sm:hidden h-fit">
          <h1 className=" text-lg sm:text-xl font-bold h-fit">{page}</h1>
        </div>
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
          <ProfileSignOutButton />
        </div>
      </div>
      {isChat(pathname) === "/messages/new" ? ChatHeader : <></>}
    </div>
  );
};

export default HeaderElem;
