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
    <div className="flex gap-x-2 w-full">
      <div className=" max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] w-3/12">
        <UserPic />
      </div>
      <div className="flex-grow flex-col gap-2 w-9/12">
        <div className="flex flex-row gap-x-2 items-center justify-between">
          <div className="flex flex-row gap-x-2 items-center w-9/12 ">
            <UserName name={name} userhandle={userhandle} />
          </div>
          <div>
            <p className="text-xs text-neutral-500 w-3/12 ">{time}</p>
          </div>
        </div>
        <div className="text-xs text-neutral-500 truncate mt-2">
          {lastMessage}
        </div>
      </div>
    </div>
  );
};

export default UserListBox;
