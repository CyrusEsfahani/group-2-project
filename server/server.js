import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressjwt as jwt } from "express-jwt"; // Corrected import for express-jwt
import dotenv from "dotenv";
import jwksRsa from "jwks-rsa";
import routes from "./routes/index.js";
import sequelize from "./db/connection.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
// Create Express app
const app = express();

// Apply CORS middleware
app.use(cors());

// Parse incoming request bodies in JSON and URL-encoded formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

// Middleware for checking JWT tokens
// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://{yourDomain}/.well-known/jwks.json",
//   }),
//   audience: "{YOUR_API_IDENTIFIER}",
//   issuer: "https://{yourDomain}/",
//   algorithms: ["RS256"],
// });

// API endpoint that uses the JWT middleware
// app.post("/timesheets", checkJwt, (req, res) => {
//   const timesheet = req.body;
//   res.status(201).send(timesheet);
// });

// Start the server
const PORT = process.env.PORT || 3001;

// Newly added code 
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  console.log("Database connected");
});

// Express JWT: Add email to access token
export const onExecutePostLogin = async (event, api) => {
  const namespace = "https://my-app.example.com";
  api.accessToken.setCustomClaim(`${namespace}/email`, event.user.email);
};
