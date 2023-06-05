import Crud from "./Crud";
import HeaderElem from "./HeaderElem";
import { data } from "@/lib/data";

const HomeFeedPage = () => {
  const items = data;

  return (
    <div className="flex flex-col h-full w-full">
      <HeaderElem page={"Home"} />
      <div className="flex flex-col w-full overflow-y-scroll no-scrollbar">
        <div className="block sm:hidden p-4 h-full w-full border-b border-neutral-800">
          <div className="h-[30px]"></div>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className=" sm:w-full hover:bg-neutral-900 transition cursor-pointer"
          >
            <Crud item={item.post} />
          </div>
        ))}
        <div className="p-4 h-full w-full border-t border-neutral-800">
          <div className="h-[100px] text-center text-sm text-neutral-500">
            <p>{`You're all caught up!`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedPage;
