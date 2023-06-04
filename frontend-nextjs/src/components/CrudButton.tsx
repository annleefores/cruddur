import { HiOutlinePencilSquare } from "react-icons/hi2";
const CrudButton = () => {
  return (
    <button className=" text-neutral-400 hover:text-white sm:text-white font-bold p-1 sm:p-2 w-full rounded-full hover:bg-[#46108d] sm:hover:sm:bg-[#8c06ec] sm:bg-[#9500FF]">
      <HiOutlinePencilSquare className="block xl:hidden w-7 h-7 sm:w-6 sm:h-6" />
      <p className="hidden xl:block">Crud</p>
    </button>
  );
};

export default CrudButton;
