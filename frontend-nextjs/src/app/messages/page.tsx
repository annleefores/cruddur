"use client";
import MessageComponent from "./components/MessageComponent";

const Home = () => {
  return (
    <div className="bg-[#02060E] h-full w-full">
      <MessageComponent Msg={true} />
    </div>
  );
};

export default Home;
