import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ContextisLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  if (ContextisLoading) {
    return <></>;
  }

  if (!isAuthenticated) {
    router.push("/signin");
  }

  return { children };
}
