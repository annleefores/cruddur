import Image from "next/image";
import React from "react";
import ImageWithFallback from "./ImageWithFallback ";
import user from "../../public/user.png";

interface UserPicProps {
  sub?: string;
}

const UserPic: React.FC<UserPicProps> = ({ sub }) => {
  return (
    <div>
      {sub ? (
        <>
          <ImageWithFallback
            src={`https://assets.annleefores.cloud/avatars/${sub}.jpg`}
            alt="user-profile"
            width={200}
            height={200}
            priority
            className="object-cover  rounded-full"
            fallbackSrc={user}
          />
        </>
      ) : (
        <>
          <Image
            src={user}
            alt="user-profile"
            width={200}
            height={200}
            priority
            className="object-cover  rounded-full"
          />
        </>
      )}
    </div>
  );
};

export default UserPic;
