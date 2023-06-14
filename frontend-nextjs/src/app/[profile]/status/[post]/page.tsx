"use client";
import CrudPage from "@/components/CrudPage";
import HeaderElem from "@/components/HeaderElem";
import React from "react";
import PostExpanded from "./components/PostExpanded";
import { useReply } from "@/hooks/useSWRhooks";

const Home = () => {
  const { data, isLoading, isError, params } = useReply();

  return (
    <div className="bg-[#02060E] h-full w-full">
      <HeaderElem page={`Crud`} />
      <PostExpanded activity={data?.activity} />
      <CrudPage data={data?.replies} hiddenNoPostMessage={true} />
    </div>
  );
};

export default Home;
