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
      <div className="block sm:hidden sticky bottom-0 right-0 left-0">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
