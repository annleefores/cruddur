import UserName from "@/components/UserName";
import UserPic from "@/components/UserPic";

interface CrudNotificationProps {
  name: string;
  userhandle: string;
}
const UserListBox: React.FC<CrudNotificationProps> = ({ name, userhandle }) => {
  const time = "15h";
  const lastMessage = "Hi! how are you?";
  return (
    <div className="flex flex-row gap-x-4 items-center ">
      <div className="max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] w-3/12">
        <UserPic />
      </div>
      <div className="flex flex-col gap-2 w-9/12">
        <div className="flex flex-row gap-x-2 items-center">
          <UserName name={name} userhandle={userhandle} />
          <p className="text-xs text-neutral-500"> • {time}</p>
        </div>
        <div className="text-xs text-neutral-500 truncate">{lastMessage}</div>
      </div>
    </div>
  );
};

export default UserListBox;
