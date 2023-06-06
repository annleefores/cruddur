import Image from "next/image";
import user from "../../public/user.png";

const UserPic = () => {
  return (
    <div>
      <Image
        src={user}
        alt="user-profile"
        priority
        className="object-cover  rounded-full"
      />
    </div>
  );
};

export default UserPic;
