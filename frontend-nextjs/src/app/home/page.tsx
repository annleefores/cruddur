"use client";
import HeaderElem from "@/components/HeaderElem";
import HomeFeedPage from "@/components/HomeFeedPage";
import RightSidebar from "@/components/RightSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    console.log("isAuth", auth.isAuthenticated);
  }, []);

  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full">
        <div className="bg-[#02060E] w-screen sm:w-[600px]">
          <HomeFeedPage />
        </div>
      </div>
    </>
  );
}
