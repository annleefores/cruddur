import Crud from "./Crud";
import CrudPage from "./CrudPage";
import HeaderElem from "./HeaderElem";

const HomeFeedPage = () => {
  return (
    <div className="flex flex-col h-full w-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Home"} />

      <div className=" ">
        <div className="flex flex-col w-full justify-center ">
          <div className="block sm:hidden h-full w-full border-b border-neutral-800">
            <div className="mb-10"> </div>
          </div>
          <CrudPage />
        </div>
      </div>
    </div>
  );
};

export default HomeFeedPage;
