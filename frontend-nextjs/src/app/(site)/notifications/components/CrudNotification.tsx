import Image from "next/image";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import demouser from "../../../../../public/demouser.png";

interface CrudNotificationProps {
  userhandle: string;
  notification: string;
}

const CrudNotification: React.FC<CrudNotificationProps> = ({
  userhandle,
  notification,
}) => {
  return (
    <div className="flex flex-row gap-x-6 items-center p-2  px-4  h-full">
      <IoNotifications size={14} className="text-[#9500FF] w-1/12" />
      <div className="flex flex-col gap-y-2 w-11/12">
        <div className="bg-white rounded-full max-w-[30px] max-h-[30px] h-full w-full">
          <Image src={demouser} alt="demouser" className="object-cover" />
        </div>
        <p className="text-sm text-neutral-300">{notification}</p>
      </div>
    </div>
  );
};

export default CrudNotification;
