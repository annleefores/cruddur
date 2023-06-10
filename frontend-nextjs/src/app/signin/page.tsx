"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import SignPage from "@/components/SignPage";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const auth = useAuth();

  return (
    <>{auth.isLoading ? <LoadingSpinner /> : <SignPage type={"signin"} />}</>
  );
}
