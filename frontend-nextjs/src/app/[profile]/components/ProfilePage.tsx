"use client";

import Profile from "./Profile";
import CrudPage from "@/components/CrudPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProfileObject } from "@/interfaces/type";
import { usePathname } from "next/navigation";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { twMerge } from "tailwind-merge";

const ProfilePage = () => {
  const pathname = usePathname();

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/api/activities/@${pathname.substring(1)}`;

  const { data, error, isLoading, mutate } = useSWR<ProfileObject>(
    url,
    fetcher
  );

  if (error) console.log(error);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col w-full pt-10 sm:pt-0 ">
      <div className="border-b border-neutral-800">
        <Profile data={data?.profile} />
      </div>
      <div className={twMerge("block", !data && "hidden")}>
        {data?.activities.length !== 0 ? (
          <CrudPage data={data?.activities} isLoading={isLoading} />
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
    </div>
  );
};

export default ProfilePage;
