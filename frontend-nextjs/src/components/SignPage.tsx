import ConfirmForm from "@/app/confirm/components/ConfirmForm";
import Recover from "@/app/forgot/components/Recover";
import SigninForm from "@/app/signin/components/SigninForm";
import SignupForm from "@/app/signup/components/SignupForm";
import React from "react";

interface SignPage {
  type?: string;
}

const SignPage: React.FC<SignPage> = ({ type }) => {
  return (
    <>
      <div className="flex bg-black md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-black text-white max-w-[500px] w-full rounded-lg">
          {type === "signin" ? (
            <SigninForm />
          ) : type === "signup" ? (
            <SignupForm />
          ) : type === "confirm" ? (
            <ConfirmForm />
          ) : (
            <Recover />
          )}
        </div>
      </div>
    </>
  );
};

export default SignPage;
