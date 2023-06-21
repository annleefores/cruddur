"use state";
import Image from "next/image";
import banner from "../../../../public/banner.jpg";
import UserPic from "@/components/UserPic";
import ProfileEdit from "./ProfileEdit";
import React, { useEffect, useState } from "react";
import { Profile } from "@/interfaces/type";
import { useAuth } from "@/context/useAuth";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";

interface ProfileInfo {
  data: Profile | undefined;
}

const Profile: React.FC<ProfileInfo> = ({ data }) => {
  //variables
  // const username = "Annlee Fores";
  // const handle = "annleefores";
  const followingcount = "1";
  const followerscount = "10K";
  // const bio = "DevOps Engineer | Backend Developer | Electronics Hobbyist";

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFollowing, setisFollowing] = useState<boolean>(false);
  const [display_name, setdisplay_name] = useState<string>("");
  const [bio, setbio] = useState<string>("");

  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function openModal() {
    setIsOpen(true);
  }

  const followFunc = () => {
    if (isAuthenticated) {
      setisFollowing(!isFollowing);
    } else {
      router.push("/signin");
    }
  };

  const UpdateDN = async (name: string) => {
    setdisplay_name(name);
  };
  const UpdateBio = async (userbio: string) => {
    setbio(userbio);
  };

  useEffect(() => {
    setdisplay_name(data?.display_name || "");
    setbio(data?.bio || "");
  }, [data]);

  return (
    <>
      <div className="relative">
        <Image
          src={banner}
          alt="user-profile"
          priority
          className="object-cover h-36 md:h-52"
        />
        <div className="max-w-[100px] bg-[#02060E] rounded-full p-1 absolute -bottom-3 left-3 sm:left-5 ">
          <UserPic sub={data?.cognito_user_uuid} />
        </div>
        <div
          className={twMerge("flex justify-end mx-4 my-4", !data && "hidden")}
        >
          {!isAuthenticated ||
          !(user.preferred_username === pathname.substring(1)) ? (
            <>
              <div className="flex flex-row gap-x-2 sm:gap-x-4 items-center">
                <Link
                  href={`/messages/new/${pathname.substring(1)}`}
                  className={twMerge(`hidden`, isAuthenticated && "block")}
                >
                  <div className="cursor-pointer">
                    <div className="flex flex-row items-center justify-center px-1 sm:px-2 border border-neutral-500 rounded-full hover:bg-neutral-800">
                      <HiOutlineMail size={20} className="m-1  my-1.5" />
                      <p className="hidden sm:block">Message</p>
                    </div>
                  </div>
                </Link>
                <div className="min-w-[100px] w-full">
                  <button
                    onClick={followFunc}
                    className={twMerge(
                      "p-1 w-full  rounded-full hover:bg-neutral-200 font-semibold bg-white text-black  border border-neutral-500",
                      isFollowing &&
                        "bg-inherit text-white hover:bg-neutral-800"
                    )}
                  >
                    {isFollowing ? <>Following</> : <>Follow</>}
                  </button>
                  <ProfileEdit
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    display_name={display_name}
                    bio={bio}
                    UpdateDN={UpdateDN}
                    UpdateBio={UpdateBio}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={openModal}
                className="p-1 px-4 rounded-full hover:bg-neutral-800  border border-neutral-500"
              >
                Edit Profile
              </button>
              <ProfileEdit
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                display_name={display_name}
                bio={bio}
                UpdateDN={UpdateDN}
                UpdateBio={UpdateBio}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-6 md:px-8">
        <div className=" flex flex-col">
          <p className="text-lg md:text-xl font-bold">{data?.display_name}</p>
          <p className="text-sm text-neutral-500">
            {data ? <>@{data?.handle}</> : ""}
          </p>
        </div>
        <div className=" text-sm">
          <p>{data?.bio}</p>
        </div>
        <div
          className={twMerge(
            "flex flex-col xs:flex-row gap-x-4 w-fit sm:gap-x-6 text-sm text-neutral-500 ",
            !data && "hidden"
          )}
        >
          <p>
            <span className=" text-white mr-1">{followingcount}</span>Following
          </p>
          <p>
            <span className=" text-white mr-1">{followerscount}</span>
            Followers
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
