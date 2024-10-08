import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressjwt as jwt } from "express-jwt"; // Corrected import for express-jwt
import jwksRsa from "jwks-rsa";

// Create Express app
const app = express();

// Apply CORS middleware
app.use(cors());

// Parse incoming request bodies in JSON and URL-encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for checking JWT tokens
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://{yourDomain}/.well-known/jwks.json",
  }),
  audience: "{YOUR_API_IDENTIFIER}",
  issuer: "https://{yourDomain}/",
  algorithms: ["RS256"],
});

// API endpoint that uses the JWT middleware
app.post("/timesheets", checkJwt, (req, res) => {
  const timesheet = req.body;
  res.status(201).send(timesheet);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Express JWT: Add email to access token
export const onExecutePostLogin = async (event, api) => {
  const namespace = "https://my-app.example.com";
  api.accessToken.setCustomClaim(`${namespace}/email`, event.user.email);
};
