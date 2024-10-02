import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// middleware for checking jwt
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://{yourDomain}/.well-known/jwks.json`
  }),
  // validation
  audience: '{YOUR_API_IDENTIFIER}',
  issuer: 'https://{yourDomain}/',
  algorithms: ['RS256']
});

// api endpoint
app.post('/timesheets', checkJwt, jwtAuthz(['create:timesheets'], { customUserKey: 'auth' }), function (req, res) {
  var timesheet = req.body;
  res.status(201).send(timesheet);
});

app.listen(8080);


// express jwt    Add email to access token
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://my-app.example.com';
  api.accessToken.setCustomClaim(`${namespace}/email`, event.user.email);
}