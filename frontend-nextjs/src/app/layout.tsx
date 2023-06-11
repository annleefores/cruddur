import LeftSidebar from "@/components/LeftSidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ProvideAuth } from "@/hooks/useAuth";
import { Suspense } from "react";
import Loading from "./loading";
import { Amplify } from "aws-amplify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cruddur",
  description: "Ephemeral micro-blogging platform",
};

Amplify.configure({
  AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.CLIENT_ID,
  oauth: {
    domain: process.env.DOMAIN,
    scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: process.env.FRONTEND_URL,
    redirectSignOut: process.env.FRONTEND_URL,
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },

  Auth: {
    // We are not using an Identity Pool
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: process.env.AWS_PROJECT_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.AWS_USER_POOLS_ID, // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.CLIENT_ID, // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
  ssr: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center w-full h-full `}>
        <ProvideAuth>
          <Suspense fallback={<Loading />}>
            <div className="max-w-[700px] md:max-w-[800px] lg:max-w-[1065px] xl:max-w-[1265px] flex flex-row  w-full h-full">
              <div className="h-full">
                <LeftSidebar />
              </div>
              <div className="flex-1 h-full">{children}</div>
            </div>
          </Suspense>
        </ProvideAuth>
      </body>
    </html>
  );
}
