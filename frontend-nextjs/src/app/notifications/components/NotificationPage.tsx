import { notifications } from "@/lib/data";
import CrudNotification from "./CrudNotification";

const NotificationPage = () => {
  return (
    <div className="pt-14 sm:pt-0 w-full">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className=" w-full p-3 md:px-8 sm:w-full h-full hover:bg-neutral-900 border-b border-neutral-800 transition cursor-pointer"
        >
          <CrudNotification {...notification} />
        </div>
      ))}
      <div className="p-4 h-full w-full border-t border-neutral-800">
        <div className="h-[100px] text-center text-sm text-neutral-500">
          <p>{`You're all caught up!`}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
