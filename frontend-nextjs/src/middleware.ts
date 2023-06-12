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

  // Define paths that don't require auth
  const unauthenticatedPaths = [
    "/",
    "/signin",
    "/signup",
    "/confirm",
    "/forgot",
  ];

  if (unauthenticatedPaths.includes(pathname)) {
    console.log("next reponse");
    return NextResponse.next();
  }

  // for paths that need auth

  // Cognito data
  const poolId = process.env.AWS_USER_POOLS_ID;
  const clientId = process.env.CLIENT_ID;

  try {
    // get token from req -- not the ideal solution
    const myMap: Map<string, MapEntry> = Object.entries(req.cookies)[0][1];

    const idTokenRegex = new RegExp(
      `CognitoIdentityServiceProvider\\.${clientId}\\..+\\.accessToken`
    );

    const targetKey = Array.from(myMap.keys()).find((key) =>
      idTokenRegex.test(key)
    );

    if (targetKey) {
      const token = myMap.get(targetKey)?.value;
      console.log("Key found");

      if (token) {
        // verify using aws-jwt-verify

        const verifier = CognitoJwtVerifier.create({
          userPoolId: poolId || "",
          tokenUse: "access",
          clientId: clientId || "",
        });

        try {
          const payload = await verifier.verify(token);
          console.log("Token is valid");
          return NextResponse.next();
        } catch (err) {
          console.log("Token not valid!", err);
        }
      }
    } else {
      console.log("key not found");
    }
  } catch (err) {
    console.log("err", err);
  }

  console.log("middleware go to signin page");
  return NextResponse.redirect(new URL("/signin", req.url));
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/home", "/messages/:path*", "/notifications"],
// };
