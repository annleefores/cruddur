"use client";

import HeaderElem from "@/components/HeaderElem";
import NotificationPage from "./components/NotificationPage";
import withAuth from "@/components/WithAuth";

const Home = () => {
  return (
    <div className="flex-1 bg-[#02060E] w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Notification"} />
      <div className="w-full ">
        <NotificationPage />
      </div>
    </div>
  );
};

export default withAuth(Home);
