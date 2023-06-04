import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UserProfile from "./UserProfile";
const ProfileSignOutButton = () => {
  return (
    <>
      <button className="text-white w-full rounded-full hover:bg-[#46108d] transition xl:py-3 xl:px-2">
        <div className="flex flex-row justify-between items-center gap-x-2">
          <UserProfile />
          <div className="hidden xl:block text-neutral-400">
            <HiOutlineDotsHorizontal size={26} />
          </div>
        </div>
      </button>
    </>
  );
};

export default ProfileSignOutButton;
