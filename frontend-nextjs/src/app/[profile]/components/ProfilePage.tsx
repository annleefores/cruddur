"use client";

import Profile from "./Profile";
import CrudPage from "@/components/CrudPage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProfile } from "@/hooks/useSWRhooks";

const ProfilePage = () => {
  const { data, isLoading, isError } = useProfile();

  if (isError) console.log(isError);
  if (isLoading)
    return (
      <div className="mt-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex flex-col w-full pt-10 sm:pt-0 ">
      <div className="border-b border-neutral-800">
        <Profile data={data?.profile} />
      </div>
      <div>
        {data?.activities.length !== 0 ? (
          <CrudPage data={data?.activities} />
        ) : (
          <div className="w-full text-center">
            <p className="text-sm text-neutral-500 p-4">
              Nothing to see here yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
