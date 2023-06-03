import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-normal h-full w-full ">
        <div className="bg-black max-w-[650px] h-full w-full">
          <HomeFeedPage />
        </div>
        {/* <div className="hidden lg:block h-full max-w-[320px] px-2 py-4 mx-5 ">
          <RightSidebar />
        </div> */}
      </div>
    </>
  );
}
