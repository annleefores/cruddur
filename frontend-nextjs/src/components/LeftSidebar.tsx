"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import { twMerge } from "tailwind-merge";
import { isChat } from "@/lib/isChat";
import { useAuth } from "@/hooks/useAuth";

const LeftSidebar = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const skipPath = ["/signup", "/signin", "/forgot", "/confirm"];
  const authHidden = ["/home", "/notifications", "/messages"];
  return (
    <div
      className={twMerge(
        "flex-col sm:flex-row h-full w-full xl:min-w-[275px] lg:pr-1 lg:mr-1",
        skipPath.includes(pathname) && "hidden",
        isChat(pathname) === "/messages/new" && "hidden sm:block",
        !isAuthenticated && authHidden.includes(pathname) && "hidden"
      )}
    >
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
