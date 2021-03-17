const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
require("dotenv/config");

// Create express server
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable cross platform information transfer
app.use(
  cors({
    origin: [process.env.HOST_ORIGIN],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Enable session
app.use(
  session({
    key: "userid",
    secret: process.env.SECRET_HASH,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, // 24h expiry for cookie
    },
  })
);

// Routes
const users = require("./routes/User");
const crud = require("./routes/TenantCRUD");

app.use("/users", users);
app.use("/crud", crud);

app.listen(3001, () => {
  console.log("Server is running on 3001 yay!");
});
