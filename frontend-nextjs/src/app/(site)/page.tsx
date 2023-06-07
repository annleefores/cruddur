import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full  ">
        <div className="bg-black h-full w-full md:w-[600px] ">
          <HomeFeedPage />
        </div>
        <div className="hidden h-full lg:block w-[370px]">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
