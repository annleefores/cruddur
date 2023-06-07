import Image from "next/image";
import React from "react";
import { IoNotifications } from "react-icons/io5";
import demouser from "../../../../public/demouser.png";

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
      <div className="bg-white rounded-full max-w-[30px] max-h-[30px] h-full w-full">
        <Image src={demouser} alt="demouser" className="object-cover" />
      </div>
      <p className="text-sm text-neutral-300">{notification}</p>
    </div>
  );
};

export default CrudNotification;
