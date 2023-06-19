"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import RightSidebar from "@/components/RightSidebar";
import { useAuth } from "@/hooks/useAuth";
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
  return (
    <div className="flex flex-row gap-x-2 w-full h-full">
      <div className="w-screen sm:w-[600px]">{children}</div>
      <div className="hidden flex-grow lg:block overflow-y-auto no-scrollbar">
        <RightSidebar />
      </div>
    </div>
  );
}
