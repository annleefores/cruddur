"use client";
import HomeFeedPage from "@/components/HomeFeedPage";
import withAuth from "@/components/WithAuth";

const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full">
        <div className="bg-[#02060E] w-screen sm:w-[600px]">
          <HomeFeedPage />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
