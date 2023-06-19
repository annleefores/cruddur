"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SignPageHeader from "@/components/SignPageHeader";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ResendConfirmCode, confirmSignUp } from "@/lib/Auth";

const ConfirmformSchema = z.object({
  email: z.string().email("Invalid email"),
  confirmcode: z.string().length(6, "Invalid Confirmation Code"),
});

type ConfirmFormData = z.infer<typeof ConfirmformSchema>;

const ConfirmForm = () => {
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmFormData>({
    defaultValues: { email: email || "", confirmcode: "" },
    resolver: zodResolver(ConfirmformSchema),
  });

  const resend_code = async (email: string) => {
    try {
      await ResendConfirmCode(email);
      console.log("code resent successfully");
      setCodeSent(true);
    } catch (err) {
      console.log("error resending code: ", err);
    }
  };

  const onSubmit: SubmitHandler<ConfirmFormData> = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      await confirmSignUp(data.email, data.confirmcode);
      console.log("Confirm Success");
      setSuccess(true);
      router.push("/signin");
    } catch (err) {
      console.log(err);
      setError("error");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <SignPageHeader heading="Confirm your Email" />

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  htmlFor="confirmationcode"
                  className="block text-sm font-medium leading-6 text-neutral-400"
                >
                  Confirmation Code
                </label>
              </div>
              <div className="mt-1">
                <input
                  {...register("confirmcode")}
                  className="block w-full rounded border border-neutral-600 focus:border-[#9500FF] transition p-2 bg-[#02060E] text-gray-200 outline-none sm:leading-6"
                />
                {errors.confirmcode && (
                  <p className="text-xs text-red-600">
                    {errors.confirmcode.message}
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
                  <>Confirm Email</>
                )}
              </button>
            </div>
          </form>

          <div className="text-sm mt-6 text-center cursor-pointer text-neutral-400 ">
            {codeSent ? (
              <div>A new activation code has been sent to your email</div>
            ) : (
              <div
                className="hover:text-neutral-200"
                onClick={() => resend_code(email || "")}
              >
                Resend Confirmation Code
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmForm;
