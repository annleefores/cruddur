import Link from "next/link";
import React from "react";

interface TrendsProps {
  topic: string;
  count: number;
}
const Trends: React.FC<TrendsProps> = ({ topic, count }) => {
  return (
    <Link href="#">
      <div className="p-4  w-full hover:bg-neutral-900 transition">
        <p className="text-sm font-medium ">{`#${topic}`}</p>
        <p className="text-xs text-neutral-500 mt-1">{`${count} Cruds`}</p>
      </div>
    </Link>
  );
};

export default Trends;
