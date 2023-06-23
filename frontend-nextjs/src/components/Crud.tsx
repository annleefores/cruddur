import React, { useState } from "react";
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

const Crud: React.FC<Post> = ({
  created_at,
  display_name,
  expires_at,
  handle,
  likes_count,
  message,
  replies_count,
  reposts_count,
  uuid,
  cognito_user_id,
  current_user_has_liked,
}) => {
  const [LikeState, SetLikeState] = useState(current_user_has_liked);

  const router = useRouter();
  const { user } = useAuth();

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
    router.push(`/${handle}/status/${uuid}`);
  };
  const Like = async () => {
    SetLikeState(!LikeState);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${uuid}/like`;

    if (!LikeState) {
      try {
        const result = await PutData(url);
        // mut();
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
      count: likes_count,
      func: Like,
    },
    {
      icon: HiOutlineChatBubbleOvalLeft,
      label: "comment",
      count: replies_count,
      func: Comment,
    },
    {
      icon: HiOutlineArrowPathRoundedSquare,
      label: "reshare",
      count: reposts_count,
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
          <Link href={`/${handle}`} className="max-h-[40px] max-w-[50px]">
            <UserPic key={uuid} sub={cognito_user_id} />
          </Link>
          <Link
            href={`/${handle}/status/${uuid}`}
            className="min-h-full"
          ></Link>
        </div>
        <div className="w-10/12 flex-grow">
          <Link href={`/${handle}/status/${uuid}`}>
            <div className="flex flex-col px-2 w-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <UserName name={display_name} userhandle={handle} />
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs text-right  text-neutral-500">
                    {time_ago(created_at)}
                  </p>
                  {expires_at ? (
                    <>
                      <div className="inline-flex items-center gap-x-1">
                        <BiBomb size={16} className="text-neutral-500" />
                        <p className="text-xs text-neutral-500">
                          {time_future(expires_at)}
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
                  <Hashtags text={message} />
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
                  LikeState={LikeState}
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
