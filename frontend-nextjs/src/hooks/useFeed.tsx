import { Post } from "@/interfaces/type";
import { useAuth } from "./useAuth";
import useSWR from "swr";
import { Authfetcher } from "@/lib/fetcher";

export function useFeed() {
  const { user, isAuthenticated } = useAuth();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/home`;
  const token = user.accessToken;

  const { data, error, isLoading, mutate } = useSWR<Post[]>(
    [url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
    // { refreshInterval: 100 }
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mut: mutate,
  };
}
