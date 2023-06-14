"use client";
import { useAuth } from "@/hooks/useAuth";
import CrudPage from "./CrudPage";
import HeaderElem from "./HeaderElem";
import useSWR from "swr";
import { Authfetcher } from "@/lib/fetcher";
import { Post } from "../interfaces/type";
import LoadingSpinner from "./LoadingSpinner";

const HomeFeedPage = () => {
  const { user, isAuthenticated } = useAuth();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/activities/home`;
  const token = user.accessToken;

  const { data, error, isLoading } = useSWR<Post[]>(
    [url, token],
    // @ts-ignore:next-line
    ([url, token]) => Authfetcher(url, token)
    // { refreshInterval: 100 }
  );

  if (error) console.log(error);
  if (isLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );

  // useEffect(() => {
  //   console.log("isAuthenticated", isAuthenticated);
  // }, [user]);

  return (
    <div className="flex  flex-col h-full w-full overflow-y-scroll no-scrollbar">
      <HeaderElem page={"Home"} />

      <div className=" ">
        <div className="flex flex-col w-full justify-center ">
          <div className="block sm:hidden h-full w-full border-b border-neutral-800">
            <div className="mb-10"> </div>
          </div>
          <CrudPage data={data} />
        </div>
      </div>
    </div>
  );
};

export default HomeFeedPage;
