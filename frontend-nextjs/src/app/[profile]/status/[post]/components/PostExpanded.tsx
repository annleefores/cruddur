import Crud from "@/components/Crud";
import CrudActivities from "@/components/CrudActivities";
import Hashtags from "@/components/Hashtags";
import UserName from "@/components/UserName";
import UserPic from "@/components/UserPic";
import { Post } from "@/interfaces/type";
import { format_datetime, time_future } from "@/lib/DateTimeFormat";
import Link from "next/link";
import React, { useState } from "react";
import { BiBomb } from "react-icons/bi";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import { RxShare2 } from "react-icons/rx";

interface PostExpandedProps {
  activity: Post | undefined;
}

const PostExpanded: React.FC<PostExpandedProps> = ({ activity }) => {
  const [LikeState, SetLikeState] = useState(false);

  const Like = async () => {
    SetLikeState(!LikeState);
  };

  const Repost = async () => {
    // Repost
  };

  const Share = async () => {
    // Share
  };

  const activities = [
    {
      icon: HiOutlineHeart,
      label: "like",
      count: activity?.likes_count,
      func: Like,
    },
    {
      icon: HiOutlineChatBubbleOvalLeft,
      label: "comment",
      count: activity?.replies_count,
    },
    {
      icon: HiOutlineArrowPathRoundedSquare,
      label: "reshare",
      count: activity?.reposts_count,
      func: Repost,
    },
    {
      icon: RxShare2,
      label: "share",
      func: Share,
    },
  ];

  return (
    <div className="flex flex-col p-3 w-full border border-neutral-800">
      <div className="py-6 sm:hidden" />
      <Link
        href={`/${activity?.handle}`}
        className=" max-h-[50px] md:max-h-[50px] w-fit"
      >
        <div className="flex flex-row max-w-[150px] md:max-w-[150px] gap-x-3 w-full">
          <UserPic sub={activity?.cognito_user_id} />

          <div className="flex flex-row justify-between items-center">
            <div>
              <UserName
                name={activity?.display_name}
                userhandle={activity?.handle}
              />
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full">
        <Link href={`/${activity?.handle}/status/${activity?.uuid}`}>
          <div className="flex flex-col w-full py-4 px-2">
            <div className="text-sm md:text-base break-words line-clamp-4 my-2">
              <Hashtags text={activity?.message || ""} />
            </div>
          </div>
          <div className="flex flex-row gap-x-4 p-2 py-4 items-center border-b border-neutral-800">
            <p className="text-sm  text-neutral-500">
              {format_datetime(activity?.created_at)}
            </p>
            {activity?.expires_at ? (
              <>
                <div className="inline-flex items-center gap-x-1">
                  <BiBomb size={20} className="text-neutral-500" />
                  <p className="text-sm text-neutral-500">
                    {time_future(activity?.expires_at)}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </Link>
        <div className="flex justify-center p-2">
          <div className="flex flex-row w-full justify-between text-neutral-500 my-1">
            {activities.map((activity, index) => (
              <CrudActivities key={index} {...activity} LikeState={LikeState} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExpanded;
