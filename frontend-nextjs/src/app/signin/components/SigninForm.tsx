import Image from "next/image";
import logo from "../../../../public/logo.svg";
import Link from "next/link";

const SigninForm = () => {
  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-16 w-auto"
            src={logo}
            priority
            alt="Cruddur Logo"
          />
          <h2 className="mt-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-200">
            Sign into your Cruddur account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-neutral-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-neutral-800 text-gray-200 outline-none sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-neutral-400"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/signup"
                    className="font-semibold leading-6 text-neutral-400 hover:text-neutral-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-neutral-800 text-gray-200 outline-none sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#9500FF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9a20f0]"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-neutral-400">
            {`Don't have an account?`}{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-gray-200 hover:text-gray-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SigninForm;
