const path = require('path');
require('dotenv').config();
const {createServer} = require('lwr');
const lwrServer = createServer({serverMode: process.env.ENVIRONMENT == 'TEST' ? 'dev' : 'prod'});
const app = lwrServer.getInternalServer();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const cookieSession = require('cookie-session');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(
    auth({
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        secret: process.env.SESSION_SECRET,
        authRequired: false,
        auth0Logout: true
    }),
);

const apis = express.Router();

apis.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api', apis);

const server = lwrServer.listen(({port, serverMode}) => {
    console.log(`Example app listening on port ${port} mode ${serverMode}`)
});
