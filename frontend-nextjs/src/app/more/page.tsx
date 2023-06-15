import HeaderElem from "@/components/HeaderElem";

const page = () => {
  return (
    <div className="bg-black flex flex-col h-full w-full">
      <HeaderElem page="More" />
      <div className="flex h-full w-full justify-center items-center ">
        <p className="text-lg font-semibold">Work In Progress</p>
      </div>
    </div>
  );
};

export default page;
