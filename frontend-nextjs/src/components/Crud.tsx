import React from "react";
import UserProfile from "./UserProfile";

interface CrudProps {
  item: string;
}
const Crud: React.FC<CrudProps> = ({ item }) => {
  return (
    <div className="flex flex-col gap-y-4 p-6 h-full w-full border-b border-neutral-800">
      <UserProfile ShowName={true} />
      <div>
        <p className="py-2">{item}</p>
      </div>
      <div className="flex flex-row w-full justify-between text-neutral-500">
        <div>Like</div>
        <div>Comment</div>
        <div>Repost</div>
        <div>Share</div>
      </div>
    </div>
  );
};

export default Crud;
