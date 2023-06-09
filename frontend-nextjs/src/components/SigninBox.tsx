import Link from "next/link";
import SignButton from "./SignButton";

const SigninBox = () => {
  return (
    <div className="w-full h-[350px] rounded-lg bg-black">
      <p className="p-2 px-4 border-b border-neutral-800 font-semibold leading-9 tracking-tight">
        Join The Party!
      </p>
      <div className="flex flex-col justify-center mt-4">
        <div className="flex flex-col gap-y-4 text-sm text-center w-full p-2">
          <p>{`Have something you want to say?`}</p>
          <p>{`Don't think about it, just crud it!`}</p>
          <p>{`Regret it? No worries, We'll forget it...`}</p>
        </div>
        <SignButton />
      </div>
    </div>
  );
};

export default SigninBox;
