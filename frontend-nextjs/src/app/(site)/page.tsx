import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full ">
        <div className="bg-black max-w-[600px] h-full w-full">
          <HomeFeedPage />
        </div>
        <div className="hidden lg:block h-full p-3 px-4">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
