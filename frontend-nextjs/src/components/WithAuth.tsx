"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = async (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/signin");
      }
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : <Loading />;
  };

  return Wrapper;
};

export default withAuth;
