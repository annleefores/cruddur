import HeaderElem from "@/components/HeaderElem";
import MessageUserList from "./components/MessageUserList";

const page = () => {
  return (
    <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Messages"} />
      <div className="h-full w-full pt-14 sm:pt-0">
        <MessageUserList />
      </div>
    </div>
  );
};

export default page;
