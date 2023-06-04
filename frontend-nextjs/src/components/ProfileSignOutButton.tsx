import Image from "next/image";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import user from "../../public/user.png";
const ProfileSignOutButton = () => {
  return (
    <>
      <button className="text-white w-full rounded-full hover:bg-[#46108d] xl:py-3 xl:px-2">
        <div className="flex flex-row justify-between items-center gap-x-2 ">
          <div className="flex flex-row items-center gap-x-2">
            <div className="w-full sm:max-h-[40px] sm:max-w-[40px] rounded-full bg-white">
              <Image src={user} alt="user-profile" className="object-cover" />
            </div>
            <div className="hidden xl:block flex-col text-left w-36 ">
              <p className="text-sm truncate">Annlee Fores</p>
              <p className="text-xs truncate">@annleefores</p>
            </div>
          </div>
          <div className="hidden xl:block text-neutral-400">
            <HiOutlineDotsHorizontal size={26} />
          </div>
        </div>
      </button>
    </>
  );
};

export default ProfileSignOutButton;
