import React from "react";
import MessageComponent from "../../components/MessageComponent";

interface PageProps {
  params: {
    userhandle: string;
  };
}

const page: React.FC<PageProps> = (props: PageProps) => {
  const { params } = props;
  return (
    <>
      <MessageComponent Msg={false} userhandle={params.userhandle} />
    </>
  );
};

export default page;
