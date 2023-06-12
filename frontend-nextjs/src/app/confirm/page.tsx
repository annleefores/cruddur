"use client";

import SignPage from "@/components/SignPage";
import WithoutAuth from "@/components/WithoutAuth";

const Home = () => {
  return (
    <>
      <SignPage type={"confirm"} />
    </>
  );
};
export default WithoutAuth(Home);
