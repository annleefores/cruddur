import TrendingTopics from "./TrendingTopics";

const Trending = () => {
  return (
    <div className="w-[350px] h-[350px] rounded-lg bg-black">
      <p className="p-4 border-b border-neutral-800">Trending</p>
      <div className="flex flex-row gap-y-2 w-full">
        <TrendingTopics />
      </div>
    </div>
  );
};

export default Trending;
