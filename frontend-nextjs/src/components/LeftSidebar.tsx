"use client";

import Navigation from "./Navigation";

interface LeftSidebarProps {
  children: React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ children }) => {
  return (
    <div className="flex flex-row sm:flex-row h-full w-full">
      <Navigation />
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
};

export default LeftSidebar;
