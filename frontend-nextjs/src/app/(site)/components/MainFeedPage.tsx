"use client";

import CrudPage from "@/components/CrudPage";
import HeaderElem from "@/components/HeaderElem";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Post } from "../../../interfaces/type";
import LoadingSpinner from "@/components/LoadingSpinner";

const MainFeedPage = () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/home`;

  const { data, error, isLoading } = useSWR<Post[]>(url, fetcher);

  if (error) console.log(error);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="flex flex-col h-full w-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Explore"} />

      <div className=" ">
        <div className="flex flex-col w-full justify-center ">
          <div className="block sm:hidden h-full w-full border-b border-neutral-800">
            <div className="mb-10"> </div>
          </div>

          <CrudPage data={data} />
        </div>
      </div>
    </div>
  );
};

export default MainFeedPage;
