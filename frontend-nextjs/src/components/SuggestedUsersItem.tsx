import React from "react";
import FollowButton from "./FollowButton";
import OtherProfile from "./OtherProfile";
import UserProfile from "./UserProfile";

export interface SuggestedUsersItemProps {
  item: {
    name: string;
    handle: string;
    sub: string;
  };
}

const SuggestedUsersItem: React.FC<SuggestedUsersItemProps> = ({ item }) => {
  return (
    <div className="px-3 py-4 flex flex-row justify-between items-center hover:bg-neutral-900 transition rounded">
      <OtherProfile name={item.name} handle={item.handle} sub={item.sub} />
      <div className="hover:bg-[#ece8e8] bg-white text-sm font-semibold text-black rounded-2xl">
        <FollowButton />
      </div>
    </div>
  );
};

export default SuggestedUsersItem;
