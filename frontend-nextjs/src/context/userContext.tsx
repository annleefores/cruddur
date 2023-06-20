"use client";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  userhandlestate: string;
  setUserhandlestate: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userhandlestate, setUserhandlestate] = useState<string>("");
  return (
    <UserContext.Provider value={{ userhandlestate, setUserhandlestate }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
