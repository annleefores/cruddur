import FollowButton from "./FollowButton";
import UserProfile from "./UserProfile";

const SuggestedUsersItem = () => {
  return (
    <div className="px-3 py-4 flex flex-row justify-between items-center hover:bg-neutral-900 transition rounded">
      <UserProfile />
      <div className="hover:bg-[#ece8e8] bg-white text-sm font-semibold text-black rounded-2xl">
        <FollowButton />
      </div>
    </div>
  );
};

export default SuggestedUsersItem;
