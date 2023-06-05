import React from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface CrudActivitiesProps {
  icon: IconType;
  label: string;
  count?: number;
}

const CrudActivities: React.FC<CrudActivitiesProps> = ({
  icon: Icon,
  label,
  count,
}) => {
  return (
    <div className="inline-flex cursor-pointer gap-x-2 items-center hover:text-[#9500FF]">
      <div className="p-1 rounded-full hover:bg-[#46108d]/40">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div>
        <p className={twMerge(`text-sm`, label == "share" && "hidden")}>
          {count}
        </p>
      </div>
    </div>
  );
};

export default CrudActivities;
