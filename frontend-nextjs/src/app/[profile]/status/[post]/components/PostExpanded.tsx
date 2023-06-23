import Crud from "@/components/Crud";
import CrudActivities from "@/components/CrudActivities";
import Hashtags from "@/components/Hashtags";
import UserName from "@/components/UserName";
import UserPic from "@/components/UserPic";
import { useAuth } from "@/context/useAuth";
import { useReply } from "@/hooks/useSWRhooks";
import { Post, PostData } from "@/interfaces/type";
import { format_datetime, time_future } from "@/lib/DateTimeFormat";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BiBomb } from "react-icons/bi";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import { RxShare2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface PostExpandedProps {
  activity: Post | undefined;
}

const PostExpanded: React.FC<PostExpandedProps> = ({ activity }) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { data, isLoading, isError, mut } = useReply();

  const PutData = async (url: string, requestBody?: undefined) => {
    const response = await axios.put(url, undefined, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return response.data;
  };

  const updatedData = (
    data: PostData | undefined,
    newLikeStatus: boolean
  ): PostData => {
    const updatedActivity = {
      ...data?.activity,
      current_user_has_liked: newLikeStatus,
      likes_count: data?.activity.likes_count || 0 + (newLikeStatus ? 1 : -1),

      display_name: data?.activity.display_name!,
      handle: data?.activity.handle!,
      message: data?.activity.message!,
    };

    const updatedData = {
      activity: updatedActivity,
      replies: data?.replies ?? [],
    };

    return updatedData;
  };

  const Like = async () => {
    if (isAuthenticated) {
      const newLikeStatus = !data?.activity.current_user_has_liked;

      // Update the UI optimistically

      const updateData = updatedData(data, newLikeStatus);

      mut(updateData, false);

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${activity?.uuid}/like`;

      try {
        const result = await PutData(url);
        mut();
        // mutate(Profileurl);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const Repost = async () => {
    if (isAuthenticated) {
      // do something
    } else {
      router.push("/signin");
    }
  };

  const Share = async () => {};

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
          <div className="max-w-[50px]">
            <UserPic sub={activity?.cognito_user_id} />
          </div>

          <div
            className={twMerge(
              "flex flex-row justify-between items-center",
              !activity?.handle && "hidden"
            )}
          >
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
            {activity?.created_at ? (
              <>
                <p className="text-sm  text-neutral-500">
                  {format_datetime(activity?.created_at)}
                </p>
              </>
            ) : (
              <></>
            )}
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
            {activities.map((activitiesitem, index) => (
              <CrudActivities
                key={index}
                {...activitiesitem}
                current_user_liked={activity?.current_user_has_liked}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExpanded;
