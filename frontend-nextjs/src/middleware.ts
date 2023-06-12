import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CognitoJwtVerifier } from "aws-jwt-verify";

type MapEntry = {
  name: string;
  value: string;
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  //////////// This is a temporary solution until the aws-amplify package is updated with support for NextJS middleware///////////
  console.log(">>>>>>>>>>Middleware<<<<<<<<<<");

  const { pathname } = req.nextUrl;

  // Define paths that don't require authentication
  const unauthenticatedPaths = [
    "/",
    "/signin",
    "/signup",
    "/confirm",
    "/forgot",
  ];

  try {
    if (unauthenticatedPaths.includes(pathname)) {
      console.log("next reponse");
      return NextResponse.next();
    } else {
      // Cognito data
      const region = process.env.AWS_COGNITO_REGION;
      const poolId = process.env.AWS_USER_POOLS_ID;
      const clientId = process.env.CLIENT_ID;

      // get token from req -- not the ideal solution
      const myMap: Map<string, MapEntry> = Object.entries(req.cookies)[0][1];

      const idTokenRegex = new RegExp(
        `CognitoIdentityServiceProvider\\.${clientId}\\..+\\.idToken`
      );

      const targetKey = Array.from(myMap.keys()).find((key) =>
        idTokenRegex.test(key)
      );

      if (targetKey) {
        const token = myMap.get(targetKey)?.value;
        console.log("Key found", token);

        if (token) {
          // verify using aws-jwt-verify

          // Verifier that expects valid access tokens:
          const verifier = CognitoJwtVerifier.create({
            userPoolId: poolId || "",
            tokenUse: "access",
            clientId: clientId || "",
          });

          try {
            const payload = await verifier.verify(token);
            console.log("Token is valid. Payload:", payload);
            return NextResponse.redirect(new URL("/home", req.url));
          } catch (err) {
            console.log("Token not valid!", err);
          }
        }
      } else {
        console.log("key not found");
      }
    }
  } catch (err) {
    console.log("err", err);
  }

  console.log("middleware go to signin page");
  return NextResponse.redirect(new URL("/signin", req.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home", "/messages/:path*", "/notifications"],
};
