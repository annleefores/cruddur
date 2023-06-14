import FollowButton from "./FollowButton";
import OtherProfile from "./OtherProfile";
import UserProfile from "./UserProfile";

const SuggestedUsersItem = () => {
  const somethingname = "other";
  const somethinghandle = "other";
  return (
    <div className="px-3 py-4 flex flex-row justify-between items-center hover:bg-neutral-900 transition rounded">
      <OtherProfile name={somethingname} handle={somethinghandle} />
      <div className="hover:bg-[#ece8e8] bg-white text-sm font-semibold text-black rounded-2xl">
        <FollowButton />
      </div>
    </div>
  );
};

export default SuggestedUsersItem;
