"use client";

import { getCurrentUser, signIn, signOut } from "@/lib/Auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {};
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signOutContext: () => Promise<void>;
  signInContext: (username: string, password: string) => Promise<void>;
}

type Props = {
  children?: React.ReactNode;
};

const authContext = createContext({} as UseAuth);

export const ProvideAuth: React.FC<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = (): UseAuth => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(true);
      setuser(user);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      setuser({});
    }
  };

  const signOutContext = async () => {
    await signOut();
    setIsAuthenticated(false);
    setuser({});
    router.push("/signin");
  };

  const signInContext = async (username: string, password: string) => {
    await signIn(username, password);
    await fetchUser();
    router.push("/home");
  };

  return {
    isLoading,
    isAuthenticated,
    user,
    signOutContext,
    setIsLoading,
    signInContext,
  };
};
