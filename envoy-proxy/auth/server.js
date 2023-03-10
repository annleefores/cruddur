// import { CognitoJwtVerifier } from "aws-jwt-verify";
const { CognitoJwtVerifier } = require("aws-jwt-verify");

var http = require("http");

require("dotenv").config();

const hostname = "localhost";
const port = 9002;

const server = http.createServer(async (req, res) => {
  const authorization = req.headers["authorization"];

  const result = await awsCognito(authorization);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result));
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function awsCognito(authorization) {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.AWS_USER_POOLS_ID,
    tokenUse: "access",
    clientId: process.env.CLIENT_ID,
  });

  try {
    const payload = await verifier.verify(authorization);
    console.log("Token is valid. Payload:", payload);
    return "valid" + payload;
  } catch {
    console.log("Token not valid!");
    return "not valid";
  }
}
