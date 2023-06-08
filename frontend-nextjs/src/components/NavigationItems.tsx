"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface NavigationItemsProps {
  icon: IconType;
  label: string;
  href: string;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();

  const authNav = ["Home", "More"];

  return (
    <Link
      href={href}
      className={twMerge(
        `h-auto cursor-pointer hover:text-white transition text-neutral-400 p-1 px-2 sm:px-1`,
        pathname === href && "text-white",
        href === "#" ? "hidden sm:block" : "block",
        pathname === "/" && !authNav.includes(label) && "hidden"
      )}
    >
      <div className="flex flex-col sm:flex-row  gap-x-4 items-center justify-center xl:justify-start text-md font-medium rounded-3xl p-1 xl:p-2 hover:bg-[#46108d] transition">
        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
        <p className="hidden xl:block w-100 text-xl">{label}</p>
      </div>
    </Link>
  );
};

export default NavigationItems;
