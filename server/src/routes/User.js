const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv/config");

const verifyJWT = require("../helpers/VerifyJWT");
const { route } = require("./TenantCRUD");

// Register POST Request
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "SELECT * from users where username = ?",
      [username],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        // If user doesn not exists
        if (result.length <= 0) {
          db.query(
            "INSERT INTO users (username, password, type) VALUES (?,?,?)",
            [username, hash, type],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("User inserted");
                res.send({ message: "Success!" });
              }
            }
          );
        } else {
          console.log("User already exists");
          res.send({ messageExists: "User already exists" });
        }
      }
    );
  });
});

// GET to check if user is already login in via session
router.get("/login", (req, res) => {
  // If session.user exists
  if (req.session.user) {
    // Send object with loggedIn = true
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

// GET to check if user is authenticated
router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("You are authenticated, congratz");
});

// Check if user exists
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * from users where username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      // If user exists
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            // Grab the user's id on the db
            const id = result[0].id;

            // Create jwt, use .env files for the jwt secret to not publish stuff with secret info!
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
              expiresIn: 300,
            });

            // Create a session and place the result into it
            req.session.user = result;

            res.json({ auth: true, token: token, result: result });

            console.log(`${username} logged in!`);
          } else {
            res.json({ auth: false, message: "Wrong username/password" });
          }
        });
      } else {
        res.json({ auth: false, message: "User does not exist" });
      }
    }
  );
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userId");
    req.session.destroy();
    res.send({ loggedIn: false });
  }
});

module.exports = router;
