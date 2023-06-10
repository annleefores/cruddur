"use client";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import UserProfile from "./UserProfile";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProfileSignOutButton = () => {
  const auth = useAuth();
  const router = useRouter();

  const OnClickSignOut = async () => {
    const result = await auth.signOut();
    if (result.success) {
      router.push("/");
    } else {
      //error toast
      alert(result.message);
    }
  };

  return (
    <>
      <div className="relative flex text-white w-full">
        <Popover className="w-full">
          <Popover.Button className="w-full outline-none">
            <div className="flex flex-row justify-between items-center gap-x-2 rounded-full w-full transition xl:py-2 xl:px-2 hover:bg-[#46108d]">
              <UserProfile SignOutProfile={true} />
              <div className="hidden xl:block text-neutral-400">
                <HiOutlineDotsHorizontal size={26} />
              </div>
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 sm:-right-5 top-8 xl:top-14 xl:right-0 z-50 mt-3 min-w-full text-center">
              <div className="overflow-hidden w-full rounded-lg ">
                <div className="bg-neutral-800 p-2">
                  <button onClick={OnClickSignOut} className="text-sm w-full">
                    Logout
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
};

export default ProfileSignOutButton;
