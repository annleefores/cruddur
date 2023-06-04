import About from "./About";
import Search from "./Search";
import SuggestedUsers from "./SuggestedUsers";
import Trending from "./Trending";

const RightSidebar = () => {
  return (
    <div className="py-3 px-2">
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
    </div>
  );
};

export default RightSidebar;
