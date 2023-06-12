import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeProtectedHeader, importJWK, jwtVerify } from "jose";

type MapEntry = {
  name: string;
  value: string;
};

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  //
  // This is a temporary solution until the aws-amplify package is updated with support for NextJS middleware
  //

  console.log(">>>>>>>>>>Middleware<<<<<<<<<<");

  const url = req.nextUrl.clone();

  try {
    // Define paths that don't require authentication
    const unauthenticatedPaths = [
      "/",
      "/signin",
      "/signup",
      "/confirm",
      "/forgot",
    ];
    // Allow users to continue for pages that don't require authentication
    if (unauthenticatedPaths.includes(url.pathname)) {
      console.log("next response");
      return NextResponse.next();
    } else {
      // Authenticate users for protected resources

      // Cognito data
      const region = process.env.AWS_COGNITO_REGION;
      const poolId = process.env.AWS_USER_POOLS_ID;
      const clientId = process.env.CLIENT_ID;

      const myMap: Map<string, MapEntry> = Object.entries(req.cookies)[0][1];

      const idTokenRegex = new RegExp(
        `CognitoIdentityServiceProvider\\.${clientId}\\..+\\.idToken`
      );

      const targetKey = Array.from(myMap.keys()).find((key) =>
        idTokenRegex.test(key)
      );

      console.log("targetkey", targetKey);

      if (targetKey) {
        const token = myMap.get(targetKey)?.value;
        console.log("Key found", token);

        if (token) {
          // Get keys from AWS
          const { keys } = await fetch(
            `https://cognito-idp.${region}.amazonaws.com/${poolId}/.well-known/jwks.json`
          ).then((res) => res.json());

          // Decode the user's token
          const { kid } = decodeProtectedHeader(token);

          // Find the user's decoded token in the Cognito keys
          const jwk = keys.find(
            (key: { kid: string | undefined }) => key.kid === kid
          );

          if (jwk) {
            // Import JWT using the JWK
            const jwtImport = await importJWK(jwk);

            // Verify the users JWT
            const jwtVerified = await jwtVerify(token, jwtImport)
              .then((res) => {
                console.log(res.payload.email_verified);
                // Allow verified users to continue
                console.log("middleware go to home page");
                return NextResponse.redirect(new URL("/home", req.url));
              })
              .catch((err) => console.log("verification failed", err));
          }
        }
      } else {
        console.log("Key not found");
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
