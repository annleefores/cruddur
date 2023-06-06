import Crud from "./Crud";
import HeaderElem from "./HeaderElem";
import { data } from "@/lib/data";

const HomeFeedPage = () => {
  const items = data;

  return (
    <div className="flex flex-col h-full w-full">
      <HeaderElem page={"Home"} />

      <div className="overflow-y-scroll no-scrollbar ">
        <div className="flex flex-col w-full justify-center ">
          <div className="block sm:hidden h-full w-full border-b border-neutral-800">
            <div className="mb-14"> </div>
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              className=" w-full p-3 sm:w-full h-full hover:bg-neutral-900 border-b border-neutral-800 transition cursor-pointer"
            >
              <Crud {...item} />
            </div>
          ))}
          <div className="p-4 h-full w-full border-t border-neutral-800">
            <div className="h-[100px] text-center text-sm text-neutral-500">
              <p>{`You're all caught up!`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeedPage;
