import React from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface CrudActivitiesProps {
  icon: IconType;
  label: string;
  count?: number;
  func?: () => Promise<void>;
  current_user_liked?: boolean;
}

const CrudActivities: React.FC<CrudActivitiesProps> = ({
  icon: Icon,
  label,
  count,
  func,
  current_user_liked,
}) => {
  return (
    <div
      onClick={func}
      className="inline-flex cursor-pointer gap-x-2 items-center w-[60px]"
    >
      <div className="p-1 rounded-full hover:bg-[#46108d]/40">
        <Icon
          className={twMerge(
            "w-5 h-5 sm:w-6 sm:h-6 hover:text-[#9500FF]",
            label == "like" && " hover:text-red-500 hover:scale-105",
            current_user_liked && label == "like" && "fill-red-500 text-red-500"
          )}
        />
      </div>
      <div className="truncate">
        <p className={twMerge(`text-xs`, label == "share" && "hidden")}>
          {label === "like" ? count ? count : <></> : count ? count : <></>}
        </p>
      </div>
    </div>
  );
};

export default CrudActivities;
