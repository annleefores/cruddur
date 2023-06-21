"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import RightSidebar from "@/components/RightSidebar";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ContextisLoading } = useAuth();
  const router = useRouter();

  if (ContextisLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="flex flex-row gap-x-2 w-full h-full">
        <div className="w-screen sm:w-[600px]">{children}</div>
        <div className="hidden lg:block flex-grow overflow-y-auto no-scrollbar">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
