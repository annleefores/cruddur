import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full ">
        <div className="bg-black sm:max-w-[570px] md:max-w-[600px] h-full w-full">
          <HomeFeedPage />
        </div>
      </div>
    </>
  );
}
