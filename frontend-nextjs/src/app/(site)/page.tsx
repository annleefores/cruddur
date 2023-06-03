import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex flex-row w-full min-h-screen bg-black justify-between">
          <div className="flex w-full">
            <HomeFeedPage />
          </div>
          <div className="hidden md:block">
            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
