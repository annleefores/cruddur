import React from "react";
import Crud from "./Crud";
import { Post } from "../interfaces/type";

interface PostsProps {
  data: Post[] | undefined;
}

const CrudPage: React.FC<PostsProps> = ({ data }) => {
  return (
    <div>
      {data?.map((item, index) => (
        <div
          key={index}
          className=" w-full p-3 sm:w-full h-full hover:bg-neutral-900 border-b border-neutral-800 transition cursor-pointer"
        >
          <Crud {...item} />
        </div>
      ))}
      <div className="p-4 h-full w-full border-t border-neutral-800">
        <div className="h-[100px] text-center text-sm text-neutral-500">
          <p>{`You're all caught up!`}</p>
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
