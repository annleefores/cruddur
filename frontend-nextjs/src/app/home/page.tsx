import HomeFeedPage from "@/components/HomeFeedPage";
import withAuthServer from "@/lib/unused/WithAuthServer";

const Home = () => {
  return (
    <>
      <div className="flex flex-row justify-start gap-x-2 h-full w-full">
        <div className="bg-[#02060E] w-screen sm:w-[600px]">
          <HomeFeedPage />
        </div>
      </div>
    </>
  );
};

export default withAuthServer(Home);
