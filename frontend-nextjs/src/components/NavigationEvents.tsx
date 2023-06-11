"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const DisableLoading = ["/home", "/confirm", "/signin"];

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsLoading } = useAuth();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log("navevents", url);

    if (DisableLoading.includes(url) || DisableLoading.includes(pathname)) {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}
