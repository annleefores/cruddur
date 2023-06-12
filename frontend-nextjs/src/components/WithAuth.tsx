import { Amplify, withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { awsExport } from "@/lib/awsExports";
import { useRouter } from "next/navigation";

Amplify.configure({ ...awsExport, ssr: true });

const withAuth = async (WrappedComponent: React.ComponentType) => {
  const Wrapper = async (props: any) => {
    const router = useRouter();
    // Construct a req object & prepare an SSR enabled version of Amplify
    const req = {
      headers: {
        cookie: headers().get("cookie"),
      },
    };
    const { Auth } = withSSRContext({ req });

    try {
      await Auth.currentAuthenticatedUser();
      console.log("Auth Success");
    } catch {
      console.log("auth error");
      router.push("/signin");
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
