import Image from "next/image";
import React from "react";
import user from "../../../../public/user.png";

interface CrudNotificationProps {
  userhandle: string;
  notification: string;
  seed: string;
}

const CrudNotification: React.FC<CrudNotificationProps> = ({
  userhandle,
  notification,
  seed,
}) => {
  return (
    <div className="flex flex-row gap-x-6 items-center p-2    h-full">
      <div className="rounded-full max-w-[40px] max-h-[40px] h-full w-full">
        <Image
          src={seed}
          alt={userhandle}
          className="object-cover "
          width={256}
          height={256}
        />
      </div>
      <p className="text-sm text-neutral-300">{notification}</p>
    </div>
  );
};

export default CrudNotification;
