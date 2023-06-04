"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import UserProfile from "./UserProfile";

const CrudButton = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className=" text-neutral-400 text-center hover:text-white sm:text-white font-bold p-1 sm:p-2 xl:py-4 w-full rounded-full hover:bg-[#46108d] sm:hover:sm:bg-[#8c06ec] transition sm:bg-[#9500FF]"
      >
        <HiOutlinePencilSquare className="block xl:hidden w-7 h-7 sm:w-6 sm:h-6" />
        <p className="hidden xl:block ">Crud</p>
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
              <div className="fixed inset-0 bg-black/40" />
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
                        placeholder="What would you like to say?"
                        className="w-full mt-4 h-44 md:h-52 text-lg md:text-xl bg-neutral-900 resize-none outline-none"
                      ></textarea>
                    </div>

                    <div className="mt-4 flex flex-row justify-end">
                      <button
                        type="button"
                        className="inline-flex font-bold hover:bg-[#8c06ec] transition bg-[#9500FF] justify-center rounded-l-lg border-r border-neutral-800  px-6 py-2 text-sm  text-while focus:outline-none "
                        onClick={closeModal}
                      >
                        Crud
                      </button>
                      <select
                        className=" text-sm hover:bg-[#8c06ec] transition bg-[#9500FF] rounded-r-lg px-3"
                        name="ttl"
                        id="ttls"
                      >
                        <option value="7 Days">7 Days</option>
                        <option value="7 Days">7 Days</option>
                        <option value="7 Days">7 Days</option>
                      </select>
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
