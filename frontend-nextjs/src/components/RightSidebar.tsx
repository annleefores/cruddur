"use client";
import { usePathname, useRouter } from "next/navigation";
import About from "./About";
import Search from "./Search";
import SuggestedUsers from "./SuggestedUsers";
import Trending from "./Trending";
import SigninBox from "./SigninBox";

const RightSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="py-2 px-2">
        <Search />
        {pathname == "/" ? (
          <>
            <div className="mt-3">
              <SigninBox />
            </div>
          </>
        ) : (
          <>
            <div className="mt-3">
              <Trending />
            </div>
            <div className="mt-3">
              <SuggestedUsers />
            </div>
          </>
        )}
        <div className="mt-3">
          <About />
        </div>
      </div>
      {/* ) : (
        <></>
      )} */}
    </>
  );
};

export default RightSidebar;
