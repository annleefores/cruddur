"use client";
import withAuth from "@/components/WithAuth";
import MessageComponent from "./components/MessageComponent";

const Home = () => {
  return <MessageComponent Msg={true} />;
};

export default withAuth(Home);
