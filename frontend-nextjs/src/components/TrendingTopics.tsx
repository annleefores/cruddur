import Trends from "./Trends";

const TrendingTopics = () => {
  const trends = [
    {
      topic: "100DaysOfCloud",
      count: 2053,
    },
    {
      topic: "CloudProject",
      count: 8253,
    },
    {
      topic: "AWS",
      count: 9053,
    },
  ];
  return (
    <>
      <div className="flex flex-col w-full">
        {trends.map((trend, id) => (
          <Trends key={id} {...trend} />
        ))}
      </div>
    </>
  );
};

export default TrendingTopics;
