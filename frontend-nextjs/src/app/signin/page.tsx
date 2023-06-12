"use client";
import SignPage from "@/components/SignPage";
import WithoutAuth from "@/components/WithoutAuth";

const Home = () => {
  return (
    <>
      <SignPage type={"signin"} />
    </>
  );
};
export default WithoutAuth(Home);
