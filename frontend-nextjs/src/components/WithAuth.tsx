import { awsExportServer } from "@/lib/awsExportsServer";
import { Amplify, withSSRContext } from "aws-amplify";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

Amplify.configure({ ...awsExportServer, ssr: true });

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = async (props: any) => {
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
      redirect("/signin");
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
