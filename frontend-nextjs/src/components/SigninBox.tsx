import Link from "next/link";

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
        <div className="w-full mt-2 ">
          <Link href={`/signup`} className="flex justify-center ">
            <div className="p-2 text-center rounded-full bg-[#9500FF] m-2 w-10/12 font-semibold leading-9 tracking-tight">
              Join Now!
            </div>
          </Link>
        </div>
        <div className="w-full mt-1">
          <Link href={`/signin`} className="flex justify-center ">
            <div className="p-2 text-center rounded-full text-[#9500FF] m-2 w-10/12 font-semibold leading-9 tracking-tight">
              Sign In
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninBox;
