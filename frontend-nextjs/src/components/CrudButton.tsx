"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import UserProfile from "./UserProfile";

const CrudButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [inputVal, setInputVal] = useState("");

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

  return (
    <>
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
                      <textarea
                        maxLength={240}
                        value={inputVal}
                        onChange={handleInputChange}
                        placeholder="What would you like to say?"
                        className="w-full mt-4 h-52 text-lg md:text-xl bg-neutral-900 resize-none outline-none"
                      ></textarea>
                    </div>

                    <div className="mt-4 flex flex-row justify-between items-center">
                      <p className="text-neutral-400 text-sm">{240 - count}</p>
                      <div className="flex flex-row gap-x-4">
                        <select
                          className="h-full text-neutral-400 text-sm py-2 outline-none bg-neutral-900 rounded-r-lg px-3"
                          name="ttl"
                          id="ttl"
                        >
                          <option value="1 Hours">1 Hour</option>
                          <option value="3 Hours">3 Hours</option>
                          <option value="30 Hours">30 Hours</option>
                          <option value="1 Days">1 Days</option>
                          <option value="3 Days">3 Days</option>
                          <option value="7 Days">7 Days</option>
                          <option value="30 Days">30 Days</option>
                        </select>
                        <button
                          type="button"
                          className="inline-flex font-semibold hover:bg-[#8c06ec] transition bg-[#9500FF] justify-center rounded-lg border-neutral-800  px-6 py-2 text-sm focus:outline-none "
                          onClick={closeModal}
                        >
                          Crud
                        </button>
                      </div>
                    </div>
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
