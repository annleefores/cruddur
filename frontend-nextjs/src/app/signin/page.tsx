import SignPage from "@/components/SignPage";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  return (
    <>
      <SignPage type={"signin"} />
    </>
  );
}
