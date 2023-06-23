import React from "react";
import Crud from "./Crud";
import { Post } from "../interfaces/type";
import LoadingSpinner from "./LoadingSpinner";

interface PostsProps {
  data: Post[] | undefined;
  hiddenNoPostMessage?: boolean;
  isLoading?: boolean;
}

const CrudPage: React.FC<PostsProps> = ({
  data,
  hiddenNoPostMessage,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="mt-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      {data?.map((item, index) => (
        <div
          key={index}
          className=" w-full p-3 sm:w-full h-full hover:bg-neutral-900 border-b border-neutral-800 transition cursor-pointer"
        >
          <Crud item={item} />
        </div>
      ))}
      <div className="p-4 h-full w-full border-t border-neutral-800">
        <div className="h-[100px] text-center text-sm text-neutral-500">
          {hiddenNoPostMessage ? <></> : <p>{`You're all caught up!`}</p>}
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
