import React from "react";

interface UserNameProps {
  name?: string;
  userhandle?: string;
}
const UserName: React.FC<UserNameProps> = ({ name, userhandle }) => {
  return (
    <>
      <p className="text-sm truncate hover:underline">
        {name || "Annlee Fores"}
      </p>
      <p className="text-xs truncate text-neutral-400">
        @{userhandle || "annleefores"}
      </p>
    </>
  );
};

export default UserName;
