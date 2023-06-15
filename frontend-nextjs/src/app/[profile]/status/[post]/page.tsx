"use client";
import CrudPage from "@/components/CrudPage";
import HeaderElem from "@/components/HeaderElem";
import React from "react";
import PostExpanded from "./components/PostExpanded";
import { useReply } from "@/hooks/useSWRhooks";
import CrudExpandedReply from "./components/CrudExpandedReply";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {
  const { data, isLoading, isError, params } = useReply();

  if (isError) console.log(isError);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="bg-[#02060E] h-full w-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={`Crud`} showHeaderWithArrow={true} />
      <div className="flex-grow">
        <PostExpanded activity={data?.activity} />
      </div>
      <CrudExpandedReply />
      <CrudPage data={data?.replies} hiddenNoPostMessage={true} />
    </div>
  );
};

export default Home;
