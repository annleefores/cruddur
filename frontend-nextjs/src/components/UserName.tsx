import React from "react";

interface UserNameProps {
  name?: string;
  userhandle?: string;
}
const UserName: React.FC<UserNameProps> = ({ name, userhandle }) => {
  return (
    <>
      <p className="text-sm truncate hover:underline">{name || ""}</p>
      <p className="text-xs truncate text-neutral-400">@{userhandle || ""}</p>
    </>
  );
};

export default UserName;
