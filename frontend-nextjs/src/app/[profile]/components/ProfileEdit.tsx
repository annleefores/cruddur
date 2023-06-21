"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAuth } from "@/context/useAuth";
import { mutate } from "swr";
import { usePathname } from "next/navigation";
import { S3Upload } from "@/lib/ProfileImageUpload";

interface ProfileEditProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  display_name: string;
  bio: string;
  UpdateDN: (name: string) => Promise<void>;
  UpdateBio: (userbio: string) => Promise<void>;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const EditformSchema = z.object({
  display_name: z.string().max(50, "Name can't be this long"),
  bio: z.string().max(160, "Bio can't be this long"),
  profileImage: z
    .any()
    .optional()
    .refine((files) => !files || files?.length == 1, "Image is required.")
    .refine(
      (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type Editform = z.infer<typeof EditformSchema>;

const ProfileEdit: React.FC<ProfileEditProps> = ({
  isOpen,
  setIsOpen,
  display_name,
  bio,
  UpdateDN,
  UpdateBio,
}) => {
  const [Iserror, setIsError] = useState("");
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Editform>({
    defaultValues: { profileImage: null },
    resolver: zodResolver(EditformSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const { user } = useAuth();

  const PostData = async (
    url: string,
    requestBody: { display_name: string; bio: string }
  ) => {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return response.data;
  };

  const onSubmit: SubmitHandler<Editform> = async (Formdata) => {
    setIsError("");

    UpdateDN(Formdata.display_name);
    UpdateBio(Formdata.bio);

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile/update`;
    const requestBody = {
      display_name: Formdata.display_name,
      bio: Formdata.bio,
    };

    const Profileurl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/activities/@${pathname.substring(1)}`;

    // profile update
    try {
      const result = await PostData(url, requestBody);
      mutate(Profileurl);
    } catch (err) {
      console.log("Error in Profile POST request:", err);
      setIsError("error");
    }

    if (file) {
      // image upload
      try {
        const res = await S3Upload(file, user.accessToken);
        console.log(res);
      } catch (err) {
        console.log("Error in Image POST request:", err);
        setIsError("error");
      }
    }

    setFile(null);
    closeModal();
    reset();
  };

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
                  <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-semibold ">Edit Profile</p>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="px-4 font-semibold py-1 bg-white rounded-md text-black"
                      >
                        {isSubmitting ? (
                          <>
                            <div
                              className="w-6 h-6 rounded-full animate-spin
              border-4 border-solid border-black border-t-transparent"
                            ></div>
                          </>
                        ) : (
                          <>Save</>
                        )}
                      </button>
                    </div>
                    <div className="flex flex-col gap-y-4 my-6">
                      <div>
                        <p className="text-xs  text-neutral-500 mb-1">
                          Display Name
                        </p>
                        <input
                          autoComplete="off"
                          defaultValue={display_name}
                          maxLength={50}
                          {...register("display_name")}
                          className="w-full bg-neutral-900 resize-none outline-none border rounded border-neutral-700 focus:border-neutral-500 transition p-2"
                          placeholder="Display Name"
                        />
                        {errors.display_name && (
                          <p className="text-xs text-red-600">
                            {errors.display_name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-xs  text-neutral-500 mb-1">Bio</p>
                        <input
                          defaultValue={bio}
                          autoComplete="off"
                          maxLength={160}
                          type="text"
                          {...register("bio")}
                          className="w-full bg-neutral-900 resize-none outline-none border rounded border-neutral-700 focus:border-neutral-500  transition p-2"
                          placeholder="Bio"
                        />
                        {errors.bio && (
                          <p className="text-xs text-red-600">
                            {errors.bio.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 gap-x-4">
                      <p className="text-xs w-fit text-neutral-500 mb-1">
                        Profile Picture
                      </p>
                      <div className="flex items-center justify-center w-full text-xs text-white border border-neutral-700 bg-neutral-800 truncate text-center rounded cursor-pointer">
                        <label
                          htmlFor="fileUpload"
                          className=" cursor-pointer w-full p-2"
                        >
                          {file ? file.name : "Choose a file"}
                          <input
                            type="file"
                            id="fileUpload"
                            {...register("profileImage", {
                              required: false,
                              onChange: handleFileChange,
                            })}
                            className="hidden"
                            accept="image/png, image/jpeg"
                          />
                          {errors.profileImage && (
                            <p className="text-xs text-red-600">
                              {/* @ts-ignore  */}
                              {errors.profileImage.message}
                            </p>
                          )}
                        </label>
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
  );
};

export default ProfileEdit;
