import HeaderElem from "@/components/HeaderElem";
import NotificationPage from "./components/NotificationPage";

const Home = () => {
  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Notification"} />
      <div className="w-full ">
        <NotificationPage />
      </div>
    </div>
  );
};

export default Home;
