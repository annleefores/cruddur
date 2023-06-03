import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-normal h-full w-full ">
        <div className="bg-black max-w-[600px] h-full w-full">
          <HomeFeedPage />
        </div>
        <div className="hidden lg:block h-full max-w-[400px] mx-6 py-1">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
