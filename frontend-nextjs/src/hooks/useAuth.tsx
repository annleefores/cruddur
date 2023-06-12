"use client";
import { Amplify, Auth, Hub } from "aws-amplify";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { awsExport } from "@/lib/awsExports";

Amplify.configure({ ...awsExport, ssr: true });

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  display_name: string;
  cognito_user_uuid: string;
  handle: string;
  AccessToken: string;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => Promise<Result>;
  autoSignin: () => Promise<Result>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Result {
  success: boolean;
  message: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [display_name, setdisplay_name] = useState("");
  const [cognito_user_uuid, setcognito_user_uuid] = useState("");
  const [handle, sethandle] = useState("");
  const [AccessToken, setAccessToken] = useState("");

  const router = useRouter();

  useEffect(() => {
    Auth.currentSession()
      .then((data) => {
        setIsAuthenticated(true);
        setIsLoading(false);
        const accessTok = data.getAccessToken().getJwtToken();
        setAccessToken(accessTok);
        console.log("currentSession", data);
      })
      .catch((err) => console.log("currentSession", err));

    Auth.currentAuthenticatedUser()
      .then((result) => {
        setcognito_user_uuid(result.attributes.sub);
        setdisplay_name(result.attributes.name);
        sethandle(result.attributes.preferred_username);
        console.log("currentAuthUser", result);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        setdisplay_name("");
        setcognito_user_uuid("");
        sethandle("");
        console.log("currentAuthUser", err);
      });
  }, []);

  const signIn = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const result = await Auth.signIn(username, password);

      console.log("signin", result);
      setdisplay_name(result.attributes.name);
      setcognito_user_uuid(result.attributes.sub);
      sethandle(result.attributes.preferred_username);
      setIsAuthenticated(true);

      return { success: true, message: "LOGIN SUCCESS" };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: "LOGIN FAIL",
      };
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
      setdisplay_name("");
      setcognito_user_uuid("");
      sethandle("");
      setIsAuthenticated(false);
      router.push("/");
      return { success: true, message: "LOGOUT SUCCESS" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "LOGOUT FAIL",
      };
    }
  };
  const autoSignin = async () => {
    try {
      Hub.listen("auth", ({ payload }) => {
        const { event } = payload;
        if (event === "autoSignIn") {
          const result = payload.data;
          setdisplay_name(result.attributes.name);
          setcognito_user_uuid(result.attributes.sub);
          sethandle(result.attributes.preferred_username);
          setIsAuthenticated(true);
          setIsLoading(false);
        } else if (event === "autoSignIn_failure") {
          router.push("/signin");
        }
      });
      return { success: true, message: "AUTO SIGNIN SUCCESS" };
    } catch (error) {
      return {
        success: false,
        message: "AUTO SIGNIN FAIL",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    display_name,
    cognito_user_uuid,
    handle,
    AccessToken,
    signIn,
    signOut,
    setIsLoading,
    autoSignin,
  };
};
