export const awsExport = {
  AWS_PROJECT_REGION: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
    redirectSignIn: process.env.NEXT_PUBLIC_FRONTEND_URL,
    redirectSignOut: process.env.NEXT_PUBLIC_FRONTEND_URL,
    responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
  },

  Auth: {
    // We are not using an Identity Pool
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION, // REQUIRED - Amazon Cognito Region
    userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID, // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: process.env.NEXT_PUBLIC_CLIENT_ID, // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
};
