"use client";

import Link from "next/link";
import SignPageHeader from "@/components/SignPageHeader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
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

  const router = useRouter();
  const auth = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { user } = await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          name: data.name,
          email: data.email,
          preferred_username: data.username,
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log(user);
      router.push(`/confirm?email=${data.email}`);
    } catch (error) {
      console.log("error signing up:", error);
      // add error toast
    }
  };

  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
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
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#9500FF] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9a20f0]"
              >
                Sign up
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
