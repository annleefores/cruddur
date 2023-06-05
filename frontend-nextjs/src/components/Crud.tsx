import React from "react";
import UserProfile from "./UserProfile";
import { IoShareOutline } from "react-icons/io5";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import CrudActivities from "./CrudActivities";
import Hashtags from "./Hashtags";

interface CrudProps {
  item: string;
}
const Crud: React.FC<CrudProps> = ({ item }) => {
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
      icon: IoShareOutline,
      label: "share",
    },
  ];
  return (
    <div className="flex flex-col gap-y-2 h-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <UserProfile ShowName={true} />
        </div>
        <div>
          <p className="text-xs text-neutral-500">{`10d`}</p>
        </div>
      </div>
      <div className="flex flex-col ml-12 gap-y-2">
        <div>
          <div className="text-sm md:text-base break-words line-clamp-4 my-2">
            <Hashtags text={item} />
          </div>
        </div>
        <div className="flex flex-row w-full sm:w-4/5 justify-between text-neutral-500 my-1">
          {activities.map((activity, index) => (
            <CrudActivities key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crud;
