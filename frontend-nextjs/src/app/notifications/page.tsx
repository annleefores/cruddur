import HeaderElem from "@/components/HeaderElem";
import NotificationPage from "./components/NotificationPage";

const page = () => {
  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Notification"} />
      <div className="h-full w-full pt-14">
        <NotificationPage />
      </div>
    </div>
  );
};

export default page;
