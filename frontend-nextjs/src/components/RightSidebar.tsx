import About from "./About";
import Search from "./Search";
import SuggestedUsers from "./SuggestedUsers";
import Trending from "./Trending";

const RightSidebar = () => {
  return (
    <>
      <Search />
      <div className="mt-4">
        <Trending />
      </div>
      <div className="mt-4">
        <SuggestedUsers />
      </div>
      <div className="mt-4">
        <About />
      </div>
    </>
  );
};

export default RightSidebar;
