"use client";
import UserName from "@/components/UserName";
import UserPic from "@/components/UserPic";
import { MsgGrp } from "@/interfaces/type";
import { time_ago } from "@/lib/DateTimeFormat";

const UserListBox: React.FC<MsgGrp> = ({
  created_at,
  display_name,
  handle,
  message,
  uuid,
  cognito_user_id,
}) => {
  return (
    <div className="flex gap-x-2 w-full">
      <div className=" max-w-[40px] max-h-[40px] md:max-w-[50px] md:max-h-[50px] w-3/12">
        <UserPic key={uuid} sub={cognito_user_id} />
      </div>
      <div className="flex-grow flex-col gap-2 w-9/12">
        <div className="flex flex-row gap-x-2 items-center justify-between">
          <div className="flex flex-col text-left  w-9/12 ">
            <UserName name={display_name} userhandle={handle} />
          </div>
          <div>
            <p className="text-xs text-neutral-500 w-3/12 ">
              {time_ago(created_at)}
            </p>
          </div>
        </div>
        <div className="text-xs text-neutral-500 truncate mt-2">{message}</div>
      </div>
    </div>
  );
};

export default UserListBox;
