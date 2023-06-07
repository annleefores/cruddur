import HeaderElem from "@/components/HeaderElem";
import MessageUserList from "./components/MessageUserList";
import ChatPage from "./components/ChatPage";

const page = () => {
  return (
    <div className="flex h-full">
      <div className="bg-black w-full h-full overflow-y-scroll no-scrollbar flex-col">
        <HeaderElem page={"Messages"} />

        <div className="h-full w-screen sm:w-[360px] pt-14 sm:pt-0">
          <MessageUserList />
        </div>
      </div>
      <div className="w-full overflow-y-scroll no-scrollbar flex-col ">
        <ChatPage />
      </div>
    </div>
  );
};

export default page;
