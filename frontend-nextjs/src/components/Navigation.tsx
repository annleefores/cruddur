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

const Navigation = () => {
  const username = "annleefores";
  const routes = [
    {
      icon: HiOutlineHome,
      label: "Home",
      href: "/",
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
      href: `/@${username}`,
    },
    {
      icon: HiOutlineEllipsisHorizontalCircle,
      label: "More",
      href: "/more",
    },
  ];

  return (
    <div className="flex flex-col w-16 xl:w-80 bg-[#3D0D7B] p-2 ">
      <div className="w-full max-h-[50px] max-w-[50px] mb-2 rounded-full xl:mx-2">
        <Image src={logo} alt="cruddur-logo" className="object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        {routes.map((item) => (
          <NavigationItems key={item.label} {...item} />
        ))}
      </div>
      <div>
        <button className="hidden xl:block text-white font-bold py-2 px-4 w-44 rounded-full bg-[#9500FF]">
          Crud
        </button>
      </div>
    </div>
  );
};

export default Navigation;
