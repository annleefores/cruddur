"use client";

import Navigation from "./Navigation";

const LeftSidebar = () => {
  // const pathname = usePathname();

  return (
    <div className="flex-col sm:flex-row h-full w-full xl:min-w-[275px]">
      <div className="fixed bottom-0 w-full sm:static">
        <Navigation />
      </div>
    </div>
    // <div
    //   className={twMerge(
    //     `block flex-col sm:flex-row h-full w-full xl:min-w-[275px]`,
    //     isChat(pathname) == "/messages/new" && "hidden"
    //   )}
    // >
    //   <div className="fixed bottom-0 w-full sm:static">
    //     <Navigation />
    //   </div>
    // </div>
  );
};

export default LeftSidebar;
