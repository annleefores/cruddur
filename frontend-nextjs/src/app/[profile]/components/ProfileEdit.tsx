"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EditForm from "./EditForm";

interface ProfileEditProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ isOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
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
                  <div className="flex flex-row justify-between items-center">
                    <p className="font-semibold ">Edit Profile</p>
                    <button className="px-4 font-semibold py-1 bg-white rounded-md text-black">
                      Save
                    </button>
                  </div>
                  <EditForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProfileEdit;
