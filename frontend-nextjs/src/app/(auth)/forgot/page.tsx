"use client";
import { useState } from "react";
import Recover from "./components/Recover";
import NewPassword from "./components/NewPassword";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Home = () => {
  const [FormState, setFormState] = useState("");
  const [username, setusername] = useState("");

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.push("/home");
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
