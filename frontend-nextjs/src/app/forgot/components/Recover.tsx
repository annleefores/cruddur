import Link from "next/link";
import SignPageHeader from "@/components/SignPageHeader";

const Recover = () => {
  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <SignPageHeader heading="Recover your password" />

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
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#9500FF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9a20f0]"
              >
                Send Recovery Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Recover;
