import Image from "next/image";
import React from "react";
import user from "../../../../public/user.png";

interface CrudNotificationProps {
  userhandle: string;
  notification: string;
}

const CrudNotification: React.FC<CrudNotificationProps> = ({
  userhandle,
  notification,
}) => {
  return (
    <div className="flex flex-row gap-x-6 items-center p-2    h-full">
      <div className=" rounded-full max-w-[30px] max-h-[30px] h-full w-full">
        <Image src={user} alt="user" className="object-cover" />
      </div>
      <p className="text-sm text-neutral-300">{notification}</p>
    </div>
  );
};

export default CrudNotification;
