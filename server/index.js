const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
require("dotenv/config");

// Create express server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
// IMPORTANT!! parse application/json
app.use(express.json());

// Enable cross platform information transfer
// app.use(
//   cors({
//     origin: [process.env.HOST_ORIGIN],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  PORT = 3000,
  NODE_ENV = "development",
  SESS_NAME = "SID",
  SESS_SECRET = "sutdsux",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === "production";
// Enable session
app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
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

app.use("/", auth);

var rootDir = path.dirname(__dirname);
console.log("Root Directory: " + rootDir);

app.use(express.static(path.join(rootDir, "/client/build")));
app.use(express.static(path.join(rootDir, "/client/build/static/media")));

// only get request from react component through #fetch or redirect by node server
app.get("*", (req, res) => {
  res.sendFile(path.join(rootDir + "/client/build/index.html"));
});

// app.get("*", (req, res) => {
//   res.send(` <h2> Oops! 404 Not Found </h2> `);
// });

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});

const db = require("./config/DatabaseConfig");
/*
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connecting to MySQL Database ..");
});
*/
//const db = require("./config/SQLiteConfig");
