"use client";

import Navigation from "./Navigation";

// interface LeftSidebarProps {
//   children: React.ReactNode;
// }

const LeftSidebar = () => {
  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
