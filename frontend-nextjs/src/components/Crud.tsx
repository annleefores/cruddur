import React from "react";
import { RxShare2 } from "react-icons/rx";
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
} from "react-icons/hi2";
import { BiBomb } from "react-icons/bi";
import CrudActivities from "./CrudActivities";
import Hashtags from "./Hashtags";
import UserPic from "./UserPic";
import UserName from "./UserName";
import Link from "next/link";
import { Post } from "../interfaces/type";
import { time_ago, time_future } from "../lib/DateTimeFormat";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { useFeed } from "@/hooks/useSWRhooks";
import { mutate } from "swr";

interface CrudProps {
  item: Post;
  postHandle?: string;
  postUUID?: string;
}

const Crud: React.FC<CrudProps> = ({ item, postHandle, postUUID }) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { data, isLoading, isError, mut } = useFeed();

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

  const Comment = async () => {
    router.push(`/${item.handle}/status/${item.uuid}`);
  };

  const Like = async () => {
    if (isAuthenticated) {
      const newLikeStatus = !item.current_user_has_liked;

      // Update the UI optimistically
      const updatedPosts = data?.map((content) =>
        content.uuid === item.uuid
          ? {
              ...content,
              current_user_has_liked: newLikeStatus,
              likes_count: content.likes_count || 0 + (newLikeStatus ? 1 : -1),
            }
          : content
      );

      mut(updatedPosts, false);

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${item.uuid}/like`;
      const Replyurl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/@${postHandle}/status/${postUUID}`;

      try {
        const result = await PutData(url);
        mut();
        mutate(Replyurl);
        // mutate(Profileurl);
      } catch (err) {
        console.log(err);
      }
    }
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
      count: item.likes_count,
      func: Like,
    },
    {
      icon: HiOutlineChatBubbleOvalLeft,
      label: "comment",
      count: item.replies_count,
      func: Comment,
    },
    {
      icon: HiOutlineArrowPathRoundedSquare,
      label: "reshare",
      count: item.reposts_count,
      func: Repost,
    },
    {
      icon: RxShare2,
      label: "share",
      func: Share,
    },
  ];

  return (
    <>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-2/12 max-w-[40px] ">
          <Link href={`/${item.handle}`} className="max-h-[40px] max-w-[50px]">
            <UserPic key={item.uuid} sub={item.cognito_user_id} />
          </Link>
          <Link
            href={`/${item.handle}/status/${item.uuid}`}
            className="min-h-full"
          ></Link>
        </div>
        <div className="w-10/12 flex-grow">
          <Link href={`/${item.handle}/status/${item.uuid}`}>
            <div className="flex flex-col px-2 w-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <UserName name={item.display_name} userhandle={item.handle} />
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs text-right  text-neutral-500">
                    {time_ago(item.created_at)}
                  </p>
                  {item.expires_at ? (
                    <>
                      <div className="inline-flex items-center gap-x-1">
                        <BiBomb size={16} className="text-neutral-500" />
                        <p className="text-xs text-neutral-500">
                          {time_future(item.expires_at)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col  gap-y-2">
                <div className="text-sm md:text-base break-words line-clamp-4 my-2">
                  <Hashtags text={item.message} />
                </div>
              </div>
            </div>
          </Link>
          <div className="flex justify-center smallscreen:w-4/5 px-2">
            <div className="flex flex-row w-full justify-between text-neutral-500 my-1">
              {activities.map((activity, index) => (
                <CrudActivities
                  key={index}
                  {...activity}
                  current_user_liked={item.current_user_has_liked}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
