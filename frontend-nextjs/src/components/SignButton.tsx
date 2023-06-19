import Link from "next/link";

const SignButton = () => {
  return (
    <>
      <div className="w-5/12 lg:w-full lg:mt-2">
        <Link href={`/signup`} className="flex justify-center ">
          <div className="p-0.5 lg:p-2 text-center rounded-full bg-[#9500FF] lg:m-2 w-full lg:w-10/12 font-semibold tracking-tight">
            Join Now!
          </div>
        </Link>
      </div>
      <div className="w-5/12 lg:w-full lg:mt-1">
        <Link href={`/signin`} className="flex justify-center ">
          <div className="p-0.5 lg:p-2 border lg:border-0 text-white text-center rounded-full lg:text-[#9500FF] w-full lg:m-2  lg:w-10/12 font-semibold tracking-tight">
            Sign In
          </div>
        </Link>
      </div>
    </>
  );
};

export default SignButton;
