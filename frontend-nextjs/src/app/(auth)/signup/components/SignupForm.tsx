"use client";

import Link from "next/link";
import SignPageHeader from "@/components/SignPageHeader";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/lib/Auth";
import { useState } from "react";
import ErrorToast from "@/components/ErrorToast";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.-]).{8,}$/;

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters")
    .refine((value) => passwordRegex.test(value), {
      message:
        "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 symbol, 1 number",
    }),
});

type FormData = z.infer<typeof formSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [success, setSuccess] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, {
        name: data.name,
        email: data.email,
        preferred_username: data.username,
      });
      setSuccess(true);
      router.push(`/confirm?email=${data.email}`);
    } catch (err) {
      if (err?.toString()) {
        notify(err?.toString());
      }
    }
    setIsLoading(false);
  };
  const notify = (error?: string) =>
    toast.custom((t) => <ErrorToast t={t} error={error} />);

  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <Toaster />

        <SignPageHeader heading="Sign up to create a Cruddur account" />

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-neutral-400"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  {...register("name")}
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-neutral-400"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  {...register("username")}
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
                {errors.username && (
                  <p className="text-xs text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-neutral-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
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
                  <>Sign Up</>
                )}
              </button>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold leading-6 text-gray-200 hover:text-gray-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
