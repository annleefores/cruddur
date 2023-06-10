"use client";
import { Amplify, Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

Amplify.configure({
  AWS_PROJECT_REGION: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: process.env.NEXT_PUBLIC_FRONTEND_URL,
    redirectSignOut: process.env.NEXT_PUBLIC_FRONTEND_URL,
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },

  Auth: {
    // We are not using an Identity Pool
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID, // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.NEXT_PUBLIC_CLIENT_ID, // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
});

interface UseAuth {
  isLoading: boolean;
  isAuthenticated: boolean;
  display_name: string;
  cognito_user_uuid: string;
  handle: string;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => Promise<Result>;
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

  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((result) => {
        console.log("currentAuthUser", result);
        setdisplay_name(result.attributes.name);
        setcognito_user_uuid(result.attributes.sub);
        sethandle(result.attributes.preferred_username);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setdisplay_name("");
        setcognito_user_uuid("");
        sethandle("");
        setIsAuthenticated(false);
        setIsLoading(false);
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
      return { success: true, message: "LOGOUT SUCCESS" };
    } catch (error) {
      return {
        success: false,
        message: "LOGOUT FAIL",
      };
    }
  };

  return {
    isLoading,
    isAuthenticated,
    display_name,
    cognito_user_uuid,
    handle,
    signIn,
    signOut,
    setIsLoading,
  };
};
