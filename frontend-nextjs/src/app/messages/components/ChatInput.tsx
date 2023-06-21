"use client";

import { useCallback, useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/useAuth";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { KeyedMutator } from "swr";
import { message } from "@/interfaces/type";

interface RequestBody {
  message: string;
  handle?: string;
  message_group_uuid?: string;
}

interface ChatInputProps {
  messageMutate: KeyedMutator<message[]>;
  messageData?: message[];
}

const ChatInput: React.FC<ChatInputProps> = ({
  messageMutate,
  messageData,
}) => {
  const { user } = useAuth();

  const params = useParams();

  const router = useRouter();

  const adjustTextareaHeight = useCallback(
    (textarea: HTMLTextAreaElement | null) => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
    []
  );

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      const handleInput = () => {
        adjustTextareaHeight(textarea as HTMLTextAreaElement);
      };

      textarea.addEventListener("input", handleInput);
      adjustTextareaHeight(textarea as HTMLTextAreaElement);

      return () => {
        textarea.removeEventListener("input", handleInput);
      };
    }
  }, []);

  const ChatSchema = z.object({
    message: z.string().max(1024),
  });

  type ChatForm = z.infer<typeof ChatSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChatForm>({
    resolver: zodResolver(ChatSchema),
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isSubmitting) {
      return;
    }

    const { key, ctrlKey } = event;

    if (key === "Enter" && !ctrlKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }

    if (key === "Enter" && ctrlKey) {
      event.currentTarget.value += "\n";
    }
  };

  const PostData = async (url: string, requestBody: RequestBody) => {
    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    return response.data;
  };

  const onSubmit: SubmitHandler<ChatForm> = async (Formdata) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages`;

    const requestBody: RequestBody = {
      message: Formdata.message,
    };

    if (params.userhandle) {
      requestBody.handle = params.userhandle;
    } else {
      requestBody.message_group_uuid = params.uuid;
    }

    reset();

    try {
      // optimistic update chat without createdAt and UUID

      messageMutate(
        Array.isArray(messageData)
          ? [
              ...messageData,
              {
                display_name: user.name,
                handle: user.preferred_username,
                message: Formdata.message,
              },
            ]
          : [
              {
                display_name: user.name,
                handle: user.preferred_username,
                message: Formdata.message,
              },
            ],
        false
      );
      const result = await PostData(url, requestBody);
      messageMutate();
      if (!(params.uuid === result.message_group_uuid)) {
        console.log("redirect to message group");
        router.push(`/messages/${result.message_group_uuid}`);
      }
    } catch (error) {
      // Handle the error as needed
      console.error("Error in POST request:", error);
      // add error toast
    }
  };

  const { ref, ...rest } = register("message");

  return (
    <div className=" bg-[#02060E] p-1">
      <div className="flex items-center gap-x-2 rounded-lg bg-gray-800 mx-1 my-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row justify-between items-center w-full"
        >
          <textarea
            {...rest}
            ref={(e) => {
              ref(e);
              adjustTextareaHeight(e);
            }}
            onKeyDown={handleKeyDown}
            maxLength={1024}
            rows={1}
            placeholder="Send a new message"
            className="w-full px-2 py-1 md:py-2 resize-none no-scrollbar rounded-lg focus:outline-none focus:shadow-outline bg-gray-800 outline-none m-1 "
          />
          <button disabled={isSubmitting} type="submit" className="mx-2">
            <IoSend size={26} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
