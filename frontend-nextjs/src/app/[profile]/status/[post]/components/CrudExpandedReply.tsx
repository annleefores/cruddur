import UserPic from "@/components/UserPic";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/useAuth";
import { useReply } from "@/hooks/useSWRhooks";
import { Post } from "@/interfaces/type";
import axios from "axios";
import ErrorToast from "@/components/ErrorToast";
import toast, { Toaster } from "react-hot-toast";

interface CrudExpandedReplyProps {
  activity: Post | undefined;
}

const CrudExpandedReply: React.FC<CrudExpandedReplyProps> = ({ activity }) => {
  const [count, setCount] = useState(0);
  const [inputVal, setInputVal] = useState("");

  const { user } = useAuth();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputVal(event.target.value);
    setCount(event.target.value.length);
  };

  const ReplySchema = z.object({
    message: z.string().max(240),
    activity_uuid: z.string(),
  });

  type ReplyForm = z.infer<typeof ReplySchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReplyForm>({
    defaultValues: {
      activity_uuid: activity?.uuid,
    },
    resolver: zodResolver(ReplySchema),
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

  const PostData = async (
    url: string,
    requestBody: { message: string; activity_uuid: string }
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

  const { mut } = useReply();

  const onSubmit: SubmitHandler<ReplyForm> = async (Formdata) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/${activity?.uuid}/reply`;

    const requestBody = {
      message: Formdata.message,
      activity_uuid: Formdata.activity_uuid,
    };

    try {
      const result = await PostData(url, requestBody);
      mut();
    } catch (err) {
      if (err?.toString()) {
        notify(err?.toString());
      }
    }
    reset();
  };

  const { ref, ...rest } = register("message", {
    onChange: handleInputChange,
  });

  const notify = (error?: string) =>
    toast.custom((t) => <ErrorToast t={t} error={error} />);
  return (
    <div className="flex gap-x-4 p-3 py-4  items-center w-full border border-neutral-800">
      <Toaster />
      <div className="max-w-[40px]">
        <UserPic sub={user.sub} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 w-full">
        <div className=" flex flex-col justify-start items-center flex-grow ">
          <textarea
            rows={1}
            maxLength={240}
            {...rest}
            ref={(e) => {
              ref(e);
              adjustTextareaHeight(e);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Crud your reply!"
            className="w-full py-2 resize-none no-scrollbar focus:outline-none focus:shadow-outline bg-black outline-none "
          />

          <div className="w-full">
            <p className="py-1 text-neutral-500 text-xs text-left ">
              {240 - count}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="p-1 px-3 rounded-full bg-[#9500FF]">
            <button disabled={isSubmitting} type="submit">
              Reply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrudExpandedReply;
