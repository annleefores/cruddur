"use state";
import Image from "next/image";
import banner from "../../../../public/banner.jpg";
import UserPic from "@/components/UserPic";
import ProfileEdit from "./ProfileEdit";
import { useState } from "react";

const Profile = () => {
  //variables
  const username = "Annlee Fores";
  const handle = "annleefores";
  const followingcount = "1";
  const followerscount = "10K";
  const bio = "DevOps Engineer | Backend Developer | Electronics Hobbyist";

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="relative">
        <Image
          src={banner}
          alt="user-profile"
          priority
          className="object-cover h-36 md:h-52"
        />
        <div className="max-w-[120px] md:max-w-[140px] bg-black rounded-full p-1 absolute -bottom-3 left-3 sm:left-5 ">
          <UserPic />
        </div>
        <div className="flex justify-end mx-2 my-2">
          <button
            onClick={openModal}
            className="p-1 px-4 rounded-full hover:bg-neutral-800  border border-neutral-500"
          >
            Edit Profile
          </button>
          <ProfileEdit isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="flex flex-col gap-y-3 p-6 md:px-8">
        <div className=" flex flex-col">
          <p className="text-lg md:text-xl font-bold">{username}</p>
          <p className="text-sm text-neutral-500">@{handle}</p>
        </div>
        <div className=" text-sm">
          <p>{bio}</p>
        </div>
        <div className="flex flex-col xs:flex-row gap-x-4 w-fit sm:gap-x-6 text-sm text-neutral-500 ">
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
