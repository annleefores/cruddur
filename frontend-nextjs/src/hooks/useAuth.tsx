"use client";

import { getCurrentUser, signIn, signOut } from "@/lib/Auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UseAuth {
  ContextisLoading: boolean;
  isAuthenticated: boolean;
  user: {};
  setContextisLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [ContextisLoading, setContextisLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setuser] = useState({});

  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then(() => setContextisLoading(false))
      .catch(() => setContextisLoading(false));
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
  };

  return {
    ContextisLoading,
    isAuthenticated,
    user,
    signOutContext,
    setContextisLoading,
    signInContext,
  };
};
