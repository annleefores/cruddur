"use client";
import React from "react";
import MessageComponent from "../../components/MessageComponent";
import { useAuth } from "@/context/useAuth";
import useSWR from "swr";
import { MsgGrp } from "@/interfaces/type";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Authfetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

interface PageProps {
  params: {
    userhandle: string;
  };
}

interface UserExists {
  message_group_uuid: string;
  display_name: string;
}

const Home: React.FC<PageProps> = (props: PageProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const { userhandlestate, setUserhandlestate } = useUserContext();

  const user_exists_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/message_groups/${props.params.userhandle}`;
  const token = user.accessToken;

  const {
    data: user_exists_data,
    error: user_exists_error,
    isLoading: user_exists_loading,
  } = useSWR<UserExists>(
    [user_exists_url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
  );

  if (user_exists_data) {
    setUserhandlestate(user_exists_data.display_name);
    router.push(`messages/${user_exists_data.message_group_uuid}`);
  }

  const ShortUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/@${props.params.userhandle}/short`;

  const { data, error, isLoading, mutate } = useSWR<MsgGrp>(
    [ShortUrl, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
  );

  if (error) console.log(error);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  return (
    <div className="bg-[#02060E] h-full w-full">
      <MessageComponent
        Msg={false}
        newuser={data}
        userhandle={props.params.userhandle}
      />
    </div>
  );
};

export default Home;
