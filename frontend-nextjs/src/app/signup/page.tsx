"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useState } from "react";
import SignupForm from "./components/SignupForm";
export default function Home() {
  // const [input1, setInput1] = useState<string>("");
  // const [input2, setInput2] = useState<string>("");

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  // };

  return (
    <>
      <div className="flex bg-neutral-800 md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-neutral-800  text-white max-w-[500px] w-full rounded-lg">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
