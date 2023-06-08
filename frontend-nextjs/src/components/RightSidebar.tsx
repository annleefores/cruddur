"use client";
import { usePathname } from "next/navigation";
import About from "./About";
import Search from "./Search";
import SuggestedUsers from "./SuggestedUsers";
import Trending from "./Trending";
import SigninBox from "./SigninBox";

const RightSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="py-3 px-2">
      <Search />
      {pathname == "/" ? (
        <>
          <div className="mt-4">
            <SigninBox />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4">
            <Trending />
          </div>
          <div className="mt-4">
            <SuggestedUsers />
          </div>
        </>
      )}
      <div className="mt-4">
        <About />
      </div>
    </div>
  );
};

export default RightSidebar;
