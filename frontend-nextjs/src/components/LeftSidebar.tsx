"use client";

import Navigation from "./Navigation";

interface LeftSidebarProps {
  children: React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="flex h-full w-full">{children}</div>
      <div className="block sm:hidden fixed bottom-0 w-full ">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
