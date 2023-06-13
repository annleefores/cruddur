"use client";

import Link from "next/link";
import SignPageHeader from "@/components/SignPageHeader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const SignInformSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

type SignInform = z.infer<typeof SignInformSchema>;

const SigninForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInform>({
    resolver: zodResolver(SignInformSchema),
  });

  const { signInContext } = useAuth();

  const onSubmit: SubmitHandler<SignInform> = async (data) => {
    setError("");
    setIsLoading(true);

    try {
      await signInContext(data.email, data.password);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("error");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <SignPageHeader heading="Sign into your Cruddur account" />
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" max-w-[380px] max-h-[250px]">
            <div className="flex-grow justify-center items-center h-auto w-auto"></div>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-neutral-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
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
              </div>
              <div className="mt-1">
                <input
                  type="password"
                  {...register("password")}
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
                {errors.password && (
                  <p className="text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="text-sm text-right mt-2">
                <Link
                  href="/forgot"
                  className=" leading-6 text-neutral-400 hover:text-neutral-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={IsLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#9500FF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9a20f0]"
              >
                {IsLoading ? (
                  <>
                    <div
                      className="w-6 h-6 rounded-full animate-spin
              border-4 border-solid border-white border-t-transparent"
                    ></div>
                  </>
                ) : (
                  <>Sign in</>
                )}
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-neutral-400">
            {`Don't have an account?`}{" "}
            <Link
              href="/signup"
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
