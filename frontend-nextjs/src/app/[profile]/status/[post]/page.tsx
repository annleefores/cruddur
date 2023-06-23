"use client";
import CrudPage from "@/components/CrudPage";
import HeaderElem from "@/components/HeaderElem";
import React from "react";
import PostExpanded from "./components/PostExpanded";
import { useReply } from "@/hooks/useSWRhooks";
import CrudExpandedReply from "./components/CrudExpandedReply";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/useAuth";

const Home = () => {
  const { data, isLoading, isError, params } = useReply();
  const { isAuthenticated } = useAuth();

  if (isError) console.log(isError);

  return (
    <div className="bg-[#02060E] h-full w-full overflow-y-scroll no-scrollbar">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderElem page={`Crud`} showHeaderWithArrow={true} />
          <div className="flex-grow">
            <PostExpanded activity={data?.activity} />
          </div>
          {isAuthenticated ? (
            <>
              <CrudExpandedReply activity={data?.activity} />
            </>
          ) : (
            <></>
          )}
          <CrudPage
            data={data?.replies}
            hiddenNoPostMessage={true}
            postHandle={data?.activity.handle}
            postUUID={data?.activity.uuid}
          />
        </>
      )}
    </div>
  );
};

export default Home;
