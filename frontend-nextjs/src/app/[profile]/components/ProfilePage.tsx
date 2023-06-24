"use client";

import Profile from "./Profile";
import CrudPage from "@/components/CrudPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProfileObject, defaultProfile } from "@/interfaces/type";
import { usePathname } from "next/navigation";

import useSWR from "swr";
import { Authfetcher, fetcher } from "@/lib/fetcher";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/context/useAuth";

const ProfilePage = () => {
  const pathname = usePathname();

  const { user, isAuthenticated } = useAuth();

  const token = user.accessToken;

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/api/activities/@${pathname.substring(1)}`;

  const {
    data,
    error,
    isLoading,
    mutate: profilemut,
  } = useSWR<ProfileObject>(
    [url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
  );

  const ProfileMutate = async (newLikeStatusChild: boolean, uuid: string) => {
    if (isAuthenticated) {
      const newLikeStatus = newLikeStatusChild;

      const updatedActivities = data?.activities.map((activity) =>
        activity.uuid === uuid
          ? {
              ...activity,
              current_user_has_liked: newLikeStatus,
              likes_count: activity.likes_count || 0 + (newLikeStatus ? 1 : -1),
            }
          : activity
      );

      const updatedData: ProfileObject = {
        profile: data?.profile || defaultProfile,
        activities: updatedActivities ?? [],
      };

      profilemut(updatedData, false);
    }
  };

  if (error) console.log(error);

  return (
    <div className="flex flex-col w-full pt-10 sm:pt-0 ">
      {isLoading ? (
        <div className="mt-14">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="border-b border-neutral-800">
            <Profile data={data?.profile} />
          </div>
          <div className={twMerge("block", !data && "hidden")}>
            {data?.activities.length !== 0 ? (
              <CrudPage
                ProfileMutate={ProfileMutate}
                data={data?.activities}
                isLoading={isLoading}
                profilemut={profilemut}
              />
            ) : (
              <div className="w-full text-center">
                <p className="text-sm text-neutral-500 p-4">
                  Nothing to see here yet
                </p>
              </div>
            )}
          </div>
          <div
            className={twMerge(
              "hidden p-1 mt-4 text-center w-full",
              !data && "block"
            )}
          >
            <p className="text-neutral-500 text-xl font-semibold">
              This account doesn’t exist
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
