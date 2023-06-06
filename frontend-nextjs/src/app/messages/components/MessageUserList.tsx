import { users } from "@/lib/data";
import UserListBox from "./UserListBox";
import Link from "next/link";

const MessageUserList = () => {
  return (
    <div>
      {users.map((user, index) => (
        <Link key={index} href={`/messages/new/${user.userhandle}`}>
          <div
            className=" w-full px-3 py-6 md:px-8 sm:w-full h-full hover:bg-neutral-900
          border-b border-neutral-800 transition cursor-pointer"
          >
            <UserListBox {...user} />
          </div>
        </Link>
      ))}
      <div className="p-4 h-full w-full border-t border-neutral-800">
        <div className="h-[60px] text-center text-sm text-neutral-500"></div>
      </div>
    </div>
  );
};

export default MessageUserList;
