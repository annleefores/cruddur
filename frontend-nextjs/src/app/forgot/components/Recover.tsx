"use client";
import SignPageHeader from "@/components/SignPageHeader";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import React from "react";

interface RecoverProps {
  setFormState: React.Dispatch<React.SetStateAction<string>>;
  setusername: React.Dispatch<React.SetStateAction<string>>;
}

const SendCodeSchema = z.object({
  email: z.string().email("Invalid email"),
});

type SendCodeSchemaData = z.infer<typeof SendCodeSchema>;

const Recover: React.FC<RecoverProps> = ({ setFormState, setusername }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeSchemaData>({
    resolver: zodResolver(SendCodeSchema),
  });

  const onSubmit: SubmitHandler<SendCodeSchemaData> = async (data) => {
    Auth.forgotPassword(data.email)
      .then((result) => {
        setFormState("newpassword");
        setusername(data.email);
      })
      .catch((err) => console.log(err));

    // // add toast
  };

  return (
    <>
      <div className="flex  flex-col justify-center px-6 py-8">
        <SignPageHeader heading="Recover your password" />

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
