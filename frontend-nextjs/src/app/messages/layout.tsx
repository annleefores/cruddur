"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, ContextisLoading } = useAuth();
  const router = useRouter();

  if (ContextisLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    router.push("/signin");
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
