import { TbEdit } from "react-icons/tb";
const CrudButton = () => {
  return (
    <div>
      <button className=" text-neutral-400 hover:text-white sm:text-white font-bold p-2 sm:p-3 xl:p-4 w-full rounded-full hover:bg-[#46108d] sm:bg-[#9500FF]">
        <p className="hidden xl:block">Crud</p>
        <div className="block xl:hidden">
          <TbEdit size={24} />
        </div>
      </button>
    </div>
  );
};

export default CrudButton;
