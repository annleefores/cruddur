import Image from "next/image";
import logo from "../../public/logo.svg";
import React from "react";

interface SignPageHeaderProps {
  heading: string;
}
const SignPageHeader: React.FC<SignPageHeaderProps> = ({ heading }) => {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-16 w-auto"
          src={logo}
          priority
          alt="Cruddur Logo"
        />
        <h2 className="mt-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-200">
          {heading}
        </h2>
      </div>
    </>
  );
};

export default SignPageHeader;
