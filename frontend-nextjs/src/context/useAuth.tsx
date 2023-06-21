"use client";

import { User } from "@/interfaces/type";
import { getCurrentUser, signIn, signOut } from "@/lib/Auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UseAuth {
  ContextisLoading: boolean;
  isAuthenticated: boolean;
  user: User;
  setContextisLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signOutContext: () => Promise<void>;
  signInContext: (username: string, password: string) => Promise<void>;
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

type Props = {
  children?: React.ReactNode;
};

const defaultUser: User = {
  sub: "",
  email_verified: "",
  name: "",
  preferred_username: "",
  email: "",
  accessToken: "",
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
  const [user, setuser] = useState<User>(defaultUser);
  const [selectedUser, setSelectedUser] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchUser()
      .then(() => setContextisLoading(false))
      .catch(() => setContextisLoading(false));
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await getCurrentUser();
      setIsAuthenticated(true);
      setuser(userData);
    } catch (err) {
      // console.log(err);
      setIsAuthenticated(false);
      setuser(defaultUser);
    }
  };

  const signOutContext = async () => {
    await signOut();
    setIsAuthenticated(false);
    setuser(defaultUser);
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
    setSelectedUser,
    selectedUser,
  };
};
