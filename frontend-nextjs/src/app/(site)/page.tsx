import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-between h-full w-full ">
        <div className="bg-black max-w-[650px] h-full w-full">
          <HomeFeedPage />
        </div>
        <div className="hidden lg:block h-full p-3">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
