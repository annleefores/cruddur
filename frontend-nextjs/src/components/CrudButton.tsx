import { TbEdit } from "react-icons/tb";
const CrudButton = () => {
  return (
    <div>
      <button className=" text-white font-bold p-3 xl:p-4 w-full rounded-full bg-[#9500FF]">
        <p className="hidden xl:block">Crud</p>
        <div className="block xl:hidden">
          <TbEdit size={24} />
        </div>
      </button>
    </div>
  );
};

export default CrudButton;
