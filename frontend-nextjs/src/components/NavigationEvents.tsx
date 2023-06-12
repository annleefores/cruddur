"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const DisableLoading = ["/home", "/confirm", "/signin"];
const authenticated = ["/signin", "/signup", "/forgot", "/confirm", "/"];

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setIsLoading, isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    console.log("navevents", url);

    if (DisableLoading.includes(url) || DisableLoading.includes(pathname)) {
      setIsLoading(false);
    }
    if (authenticated.includes(pathname) && isAuthenticated) {
      router.push("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}
