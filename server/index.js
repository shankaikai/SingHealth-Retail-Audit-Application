const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
var MySQLStore = require("express-mysql-session")(session);

require("dotenv/config");

// Create express server
const app = express();

var options = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

var sessionStore = new MySQLStore(options);

// Middleware
app.use(express.urlencoded({ extended: true }));
// IMPORTANT!! parse application/json
app.use(express.json());

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3001,
  NODE_ENV = "development",
  SESS_NAME = "SID",
  SESS_SECRET = "sutdsux",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "production";
// Enable session
app.use(
  session({
    key: "session_singhealth",
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: sessionStore,
    cookie: {
      maxAge: SESS_LIFETIME,
      secure: false,
      httpOnly: false,
    },
  })
);

// Enable cross platform information transfer
app.use(
  cors({
    origin: [process.env.SERVER_HOST],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
console.log(process.env.SERVER_HOST);
// Routes
const auth = require("./routes/Auth");
const tenant = require("./routes/Tenant");
const tenants = require("./routes/TenantsGets");
const audit = require("./routes/Audit");

app.use("/api/auth", auth);
app.use("/api/tenants", tenants);
app.use("/api/tenant", tenant);
app.use("/api/audit", audit);

// console.log("Root Directory: " + rootDir);

// app.use(express.static(path.join(rootDir, "/client/build")));
// app.use(express.static(path.join(rootDir, "/client/build/static/media")));

// only get request from react component through #fetch or redirect by node server
// app.get("*", (req, res) => {
//   res.sendFile(path.join(rootDir + "/client/build/index.html"));
// });

// app.get("*", (req, res) => {
//   res.send(` <h2> Oops! 404 Not Found </h2> `);
// });

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
