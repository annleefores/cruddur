import React, { use } from "react";
import UserProfile from "./UserProfile";
import { RxShare2 } from "react-icons/rx";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import CrudActivities from "./CrudActivities";
import Hashtags from "./Hashtags";
import UserPic from "./UserPic";
import UserName from "./UserName";
import Link from "next/link";

interface CrudProps {
  post: string;
  uuid: string;
  name: string;
  userhandle: string;
}

const Crud: React.FC<CrudProps> = ({ post, uuid, name, userhandle }) => {
  const username = "annleefores";
  const activities = [
    {
      icon: HiOutlineHeart,
      label: "like",
      count: 10,
    },
    {
      icon: HiOutlineChatBubbleOvalLeft,
      label: "comment",
      count: 10,
    },
    {
      icon: HiOutlineArrowPathRoundedSquare,
      label: "reshare",
      count: 10,
    },
    {
      icon: RxShare2,
      label: "share",
    },
  ];
  return (
    <>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col max-w-[40px] md:max-w-[50px] w-full">
          <Link href={`/${username}`} className=" max-h-[40px] md:max-h-[50px]">
            <UserPic />
          </Link>
          <Link
            href={`/${username}/status/${uuid}`}
            className="min-h-full"
          ></Link>
        </div>
        <div className="w-full">
          <Link href={`/${username}/status/${uuid}`}>
            <div className="flex flex-col px-2 w-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <UserName name={name} userhandle={userhandle} />
                </div>
                <div>
                  <p className="text-xs text-neutral-500">{`10d`}</p>
                </div>
              </div>
              <div className="flex flex-col  gap-y-2">
                <div className="text-sm md:text-base break-words line-clamp-4 my-2">
                  <Hashtags text={post} />
                </div>
              </div>
            </div>
          </Link>
          <div className="flex justify-center smallscreen:w-4/5 px-2">
            <div className="flex flex-row w-full justify-between text-neutral-500 my-1">
              {activities.map((activity, index) => (
                <CrudActivities key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
