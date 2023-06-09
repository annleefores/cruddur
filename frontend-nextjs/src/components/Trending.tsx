import TrendingTopics from "./TrendingTopics";

const Trending = () => {
  return (
    <div className="w-full h-[350px] rounded-lg bg-black">
      <p className="p-2 px-4 border-b border-neutral-800 font-semibold leading-9 tracking-tight">
        Trending
      </p>
      <div className="flex flex-row gap-y-2 w-full">
        <TrendingTopics />
      </div>
    </div>
  );
};

export default Trending;
