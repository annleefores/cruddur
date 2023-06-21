"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import RightSidebar from "@/components/RightSidebar";
import SignButton from "@/components/SignButton";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

import MainFeedPage from "./components/MainFeedPage";

const Home = () => {
  const { isAuthenticated, ContextisLoading } = useAuth();
  const router = useRouter();

  if (ContextisLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    router.push("/home");
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full ">
        <div className="bg-[#02060E] h-full w-screen sm:w-[600px]">
          <MainFeedPage />
        </div>
        <div className="hidden lg:block flex-grow h-full overflow-y-auto no-scrollbar">
          <RightSidebar />
        </div>
      </div>

      <div className="block fixed z-50 bg-[#3D0D7B] bottom-0 left-0 right-0 lg:hidden w-full py-4">
        <div className="flex flex-row  w-full justify-around items-center text-center">
          <SignButton />
        </div>
      </div>
    </>
  );
};
export default Home;
