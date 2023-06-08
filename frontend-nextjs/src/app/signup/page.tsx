"use client";

import Image from "next/image";
import logo from "../../../public/logo.svg";
import { useState } from "react";
import SignupForm from "./components/SignupForm";
export default function Home() {
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <div className="flex  h-full w-full justify-center items-center">
        <div className="bg-neutral-800 shadow-xl text-white max-w-[500px] w-full">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
