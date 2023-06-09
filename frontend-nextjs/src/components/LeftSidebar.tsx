"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { twMerge } from "tailwind-merge";
import { isChat } from "@/lib/isChat";

const LeftSidebar = () => {
  const pathname = usePathname();
  const skipPath = ["/signup", "/signin", "/forgot"];
  return (
    <div
      className={twMerge(
        "flex-col sm:flex-row h-full w-full xl:min-w-[275px] lg:pr-1 lg:mr-1",
        skipPath.includes(pathname) && "hidden",
        isChat(pathname) === "/messages/new" && "hidden sm:block"
      )}
    >
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
