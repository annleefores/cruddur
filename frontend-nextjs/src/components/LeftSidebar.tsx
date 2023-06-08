"use client";

import Navigation from "./Navigation";

const LeftSidebar = () => {
  return (
    <div className="flex-col sm:flex-row h-full w-full xl:min-w-[275px]">
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
  );
};

export default LeftSidebar;
