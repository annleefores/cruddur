import ConfirmForm from "@/app/confirm/components/ConfirmForm";

import SigninForm from "@/app/signin/components/SigninForm";
import SignupForm from "@/app/signup/components/SignupForm";
import React from "react";

interface SignPage {
  type?: string;
}

const SignPage: React.FC<SignPage> = ({ type }) => {
  return (
    <>
      <div className="flex bg-[#02060E] md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-[#02060E] text-white max-w-[500px] w-full rounded-lg">
          {type === "signin" ? (
            <SigninForm />
          ) : type === "signup" ? (
            <SignupForm />
          ) : (
            <ConfirmForm />
          )}
        </div>
      </div>
    </>
  );
};

export default SignPage;
