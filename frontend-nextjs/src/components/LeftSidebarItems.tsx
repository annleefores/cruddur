"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface LeftSidebarItemsProps {
  icon: IconType;
  label: string;
  href: string;
}

const LeftSidebarItems: React.FC<LeftSidebarItemsProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={twMerge(
        `h-auto cursor-pointer hover:text-white transition text-neutral-400 p-1 my-1 xl:my-0 `,
        pathname === href && "text-white"
      )}
    >
      <div className="flex flex-row gap-x-4 items-center justify-center xl:justify-start text-md font-medium rounded-3xl p-1 xl:p-2 hover:bg-[#46108d]">
        <Icon size={32} />
        <p className="hidden xl:block w-100 text-xl">{label}</p>
      </div>
    </Link>
  );
};

export default LeftSidebarItems;
