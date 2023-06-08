"use client";

import {
  HiOutlineHome,
  HiOutlineBell,
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlineEllipsisHorizontalCircle,
} from "react-icons/hi2";

import Image from "next/image";
import logo from "../../public/logo.svg";
import NavigationItems from "./NavigationItems";
import CrudButton from "./CrudButton";
import ProfileSignOutButton from "./ProfileSignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const username = "annleefores";
  const pathname = usePathname();
  const routes = [
    {
      icon: HiOutlineHome,
      label: "Home",
      href: "/home",
    },
    {
      icon: HiOutlineBell,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: HiOutlineEnvelope,
      label: "Messages",
      href: "/messages",
    },
    {
      icon: HiOutlineUser,
      label: "Profile",
      href: `/${username}`,
    },
    {
      icon: HiOutlineEllipsisHorizontalCircle,
      label: "More",
      href: "#",
    },
  ];

  return (
    <div className=" flex flex-row sm:flex-col justify-center sm:justify-start w-full sm:w-16 xl:w-full bg-[#3D0D7B] p-2 h-full">
      <Link href="/home">
        <div className="hidden sm:block w-full max-h-[50px] max-w-[50px] mb-2 rounded-full xl:mx-2">
          <Image src={logo} alt="cruddur-logo" className="object-cover" />
        </div>
      </Link>
      <div className="flex flex-row w-full sm:flex-col justify-evenly sm:justify-center">
        {routes.map((item) => (
          <NavigationItems key={item.label} {...item} />
        ))}
        {pathname === "/" ? (
          <></>
        ) : (
          <>
            <div className="p-1 px-2 sm:px-1 sm:mt-8 ">
              <CrudButton />
            </div>
            <div className="hidden sm:block mt-6 xl:mt-2 p-1 xl:py-2">
              <ProfileSignOutButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
