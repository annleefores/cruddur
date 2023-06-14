import Crud from "@/components/Crud";
import { Post } from "@/interfaces/type";
import React from "react";

interface PostExpandedProps {
  activity: Post | undefined;
}

const PostExpanded: React.FC<PostExpandedProps> = ({ activity }) => {
  return <div>{/* <Crud {...activity} /> */}</div>;
};

export default PostExpanded;
