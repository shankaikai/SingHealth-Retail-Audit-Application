const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const cors = require("cors");
const path = require("path");
require("dotenv/config");
var redis = require("redis");
// var client  = redis.createClient();
var RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt');
module.exports.bcrypt = bcrypt;

let client;
if(process.env.REDIS_URL){
    let redisURL = url.parse(process.env.REDIS_URL);
    client = redis.createClient(redisURL)
} else {
    client = redis.createClient()
}

// Create express server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
// IMPORTANT!! parse application/json
app.use(express.json());

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  NODE_ENV = "production",
  SESS_NAME = "SID",
  SESS_SECRET = "sutdsux",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "production";
// Enable session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      secure: false,
      httpOnly: false,
    },
    store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  })
);

// Enable cross platform information transfer
// app.use(
//   cors({
//     origin: [process.env.SERVER_HOST],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// console.log(process.env.SERVER_HOST);
// Routes
const auth = require("./routes/Auth");
const tenant = require("./routes/Tenant");
const tenants = require("./routes/TenantsGets");
const audit = require("./routes/Audit");

app.use("/api/auth", auth);
app.use("/api/tenants", tenants);
app.use("/api/tenant", tenant);
app.use("/api/audit", audit);

app.use(express.static(path.join(__dirname, "../client/build")));
// app.use(express.static(path.join(rootDir, "/client/build/static/media")));

// only get request from react component through #fetch or redirect by node server
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.get("*", (req, res) => {
//   res.send(` <h2> Oops! 404 Not Found </h2> `);
// });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server starting...`);
});
