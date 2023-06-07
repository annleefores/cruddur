"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { twMerge } from "tailwind-merge";
import { isChat } from "@/lib/isChat";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className={twMerge(
        `block flex-col sm:flex-row h-full w-full xl:min-w-[275px]`,
        isChat(pathname) == "/messages/new" && "hidden"
      )}
    >
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
