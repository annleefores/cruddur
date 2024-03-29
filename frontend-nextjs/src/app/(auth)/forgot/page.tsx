"use client";
import { useState } from "react";
import Recover from "./components/Recover";
import NewPassword from "./components/NewPassword";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {
  const [FormState, setFormState] = useState("");
  const [username, setusername] = useState("");

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
      <div className="flex bg-[#02060E] md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-[#02060E] text-white max-w-[500px] w-full rounded-lg">
          {FormState === "newpassword" ? (
            <NewPassword setFormState={setFormState} username={username} />
          ) : (
            <Recover setFormState={setFormState} setusername={setusername} />
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
