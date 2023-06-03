"use client";

import { HiHome } from "react-icons/hi";
import LeftSidebarItems from "./LeftSidebarItems";

interface LeftSidebarProps {
  children: React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ children }) => {
  const username = "annleefores";
  const routes = [
    {
      icon: HiHome,
      label: "Home",
      href: "/",
    },
    {
      icon: HiHome,
      label: "Notifications",
      href: "/notifications",
    },
    {
      icon: HiHome,
      label: "Messages",
      href: "/messages",
    },
    {
      icon: HiHome,
      label: "Profile",
      href: `/@${username}`,
    },
    {
      icon: HiHome,
      label: "More",
      href: "/more",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row flex-1">
        <div className="bg-[#3D0D7B] w-20 md:w-64 sticky top-14">
          <div className="flex flex-col gap-y-4 px-5 py-4 items-center h-full">
            {routes.map((item) => (
              <LeftSidebarItems key={item.label} {...item} />
            ))}
          </div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default LeftSidebar;
