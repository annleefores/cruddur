"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import UserProfile from "./UserProfile";
import axios, { AxiosResponse } from "axios";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/useAuth";
import { useFeed } from "@/hooks/useSWRhooks";
import { PostDataResponse } from "@/interfaces/type";
import useSWRMutation from "swr/mutation";
import { useParams, usePathname } from "next/navigation";
import ErrorToast from "@/components/ErrorToast";
import toast, { Toaster } from "react-hot-toast";
import { Authfetcher } from "@/lib/fetcher";

const CrudButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [inputVal, setInputVal] = useState("");

  const pathname = usePathname();
  const params = useParams();

  const { user, isAuthenticated } = useAuth();

  const token = user.accessToken;

  const Profileurl = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/api/activities/@${pathname.substring(1)}`;

  const { trigger } = useSWRMutation(
    [Profileurl, token],
    // @ts-ignore:next-line
    ([Profileurl, token]) => Authfetcher(Profileurl, token)
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(event.target.value);
    setCount(event.target.value.length);
  };

  function closeModal() {
    setIsOpen(false);
    setCount(0);
    setInputVal("");
  }

  function openModal() {
    setIsOpen(true);
  }

  const ActivitySchema = z.object({
    message: z.string().max(240),
    ttl: z.string(),
  });

  type ActivityForm = z.infer<typeof ActivitySchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm<ActivityForm>({
    defaultValues: {
      ttl: "7-days",
    },
    resolver: zodResolver(ActivitySchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isSubmitting) {
      return;
    }

    const textarea = event.target as HTMLTextAreaElement;

    if (event.key === "Enter" && !event.ctrlKey) {
      setValue("message", textarea.value);
      event.preventDefault();
      handleSubmit(onSubmit)();
    } else if (event.key === "Enter" && event.ctrlKey) {
      setValue("message", textarea.value + "\n");
      event.preventDefault();
    }
  };

  const PostData = async (
    url: string,
    requestBody: { message: string; ttl: string }
  ): Promise<PostDataResponse> => {
    const response: AxiosResponse<PostDataResponse> =
      await axios.post<PostDataResponse>(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
    return response.data;
  };

  const { mut } = useFeed();

  const onSubmit: SubmitHandler<ActivityForm> = async (Formdata) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities`;
    const requestBody = {
      message: Formdata.message,
      ttl: Formdata.ttl,
    };

    const Profileurl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/activities/@${pathname.substring(1)}`;

    closeModal();

    try {
      const result = await PostData(url, requestBody);

      if (params.profile) {
        trigger();
      } else {
        mut();
      }
    } catch (err) {
      if (err?.toString()) {
        notify(err?.toString());
      }
    }
    reset();
  };
  const notify = (error?: string) =>
    toast.custom((t) => <ErrorToast t={t} error={error} />);
  return (
    <>
      <Toaster />
      <button
        type="button"
        onClick={openModal}
        className=" text-neutral-400 text-center hover:text-white sm:text-white font-bold p-1 sm:p-2 w-full rounded-full hover:bg-[#46108d] sm:hover:sm:bg-[#8c06ec] transition sm:bg-[#9500FF]"
      >
        <HiOutlinePencilSquare className="block xl:hidden w-7 h-7 sm:w-6 sm:h-6" />
        <p className="hidden xl:block text-center leading-9 tracking-tight">
          Crud
        </p>
      </button>
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[#02060E]/40" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-neutral-900 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2 w-full">
                      <div className="w-full h-10">
                        <UserProfile ShowName={true} />
                      </div>
                    </div>
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                      <textarea
                        {...register("message")}
                        maxLength={240}
                        value={inputVal}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="What would you like to say?"
                        className="w-full mt-4 h-52 text-lg md:text-xl bg-neutral-900 resize-none outline-none"
                      ></textarea>

                      <div className="mt-4 flex flex-row justify-between items-center">
                        <p className="text-neutral-400 text-sm">
                          {240 - count}
                        </p>
                        <div className="flex flex-row gap-x-4">
                          <select
                            {...register("ttl")}
                            className="h-full text-neutral-400 text-sm py-2 outline-none bg-neutral-900 rounded-r-lg px-3"
                            name="ttl"
                            id="ttl"
                          >
                            <option value="1-hours">1 Hour</option>
                            <option value="3-hours">3 Hours</option>
                            <option value="30-hours">30 Hours</option>
                            <option value="1-days">1 Days</option>
                            <option value="3-days">3 Days</option>
                            <option selected value="7-days">
                              7 Days
                            </option>
                            <option value="30-days">30 Days</option>
                          </select>

                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="inline-flex font-semibold hover:bg-[#8c06ec] transition bg-[#9500FF] justify-center rounded-lg border-neutral-800  px-6 py-2 text-sm focus:outline-none "
                          >
                            {isSubmitting ? (
                              <div className="px-1.5">
                                <div
                                  className="w-5 h-5 rounded-full animate-spin
              border-4 border-solid border-white border-t-transparent"
                                ></div>
                              </div>
                            ) : (
                              <>Crud</>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </>
  );
};

export default CrudButton;
