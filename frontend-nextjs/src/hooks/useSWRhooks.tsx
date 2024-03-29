import { Post, PostData, Short } from "@/interfaces/type";
import { useAuth } from "../context/useAuth";
import useSWR from "swr";
import { Authfetcher, fetcher } from "@/lib/fetcher";
import { useParams } from "next/navigation";

export function useFeed() {
  const { user, isAuthenticated } = useAuth();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/home`;
  const token = user.accessToken;

  const { data, error, isLoading, mutate } = useSWR<Post[]>(
    [url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mut: mutate,
  };
}

export function useReply() {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const token = user.accessToken || "";

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/@${params.profile}/status/${params.post}`;

  const { data, error, isLoading, mutate } = useSWR<PostData>(
    params.profile && params.post ? [url, token] : null,
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
  );

  return {
    params: params,
    data: data,
    isLoading,
    isError: error,
    mut: mutate,
  };
}
