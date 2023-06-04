import { HiOutlinePencilSquare } from "react-icons/hi2";
const CrudButton = () => {
  return (
    <div>
      <button className=" text-neutral-400 hover:text-white sm:text-white font-bold p-1.5 sm:p-3 xl:p-4 w-full rounded-full hover:bg-[#46108d] sm:hover:sm:bg-[#8c06ec] sm:bg-[#9500FF]">
        <p className="hidden xl:block">Crud</p>
        <div className="block xl:hidden rounded-full">
          <HiOutlinePencilSquare className="w-7 h-7 sm:w-6 sm:h-6" />
        </div>
      </button>
    </div>
  );
};

export default CrudButton;
