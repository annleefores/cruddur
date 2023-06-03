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
        `flex flex-row h-auto items-center justify-center md:justify-start w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1 my-2`,
        pathname === href && "text-white"
      )}
    >
      <Icon size={32} />
      <p className="hidden md:block w-100">{label}</p>
    </Link>
  );
};

export default LeftSidebarItems;
