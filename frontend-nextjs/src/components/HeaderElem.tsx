import Image from "next/image";
import logo from "../../public/logo.svg";
import ProfileSignOutButton from "./ProfileSignOutButton";
import React from "react";
import Link from "next/link";

interface HeaderElemProps {
  page: string;
}

const HeaderElem: React.FC<HeaderElemProps> = ({ page }) => {
  return (
    <div className="flex flex-row justify-between fixed sm:sticky top-0 left-0 z-50 w-full py-3 px-4 bg-gray-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-b border-neutral-800">
      <h1 className="hidden sm:block text-lg sm:text-xl font-bold h-fit">
        {page}
      </h1>
      <Link href="/">
        <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] mb-2 rounded-full xl:mx-2">
          <Image src={logo} alt="cruddur-logo" className="object-cover" />
        </div>
      </Link>
      <div className="block sm:hidden w-full max-h-[32px] max-w-[32px] ">
        <ProfileSignOutButton />
      </div>
    </div>
  );
};

export default HeaderElem;
