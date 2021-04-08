const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");
//const db = require("../config/SQLiteConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const sendMail = require("../helpers/emails/Emailer");

// Route protector
const redirectToLogin = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect("/"); // to "/" route
  } else {
    next();
  }
};

router.get("/login", (req, res) => {
  if (req.session.userID) {
    var user = {
      userID: req.session.userID,
      userName: req.session.userName,
      userType: req.session.userType,
    };
    res.json({ cookie_status: true, result: user });
  } else {
  }
});

const INVALID_USERNAME = "INVALID_EMAIL"; // check on login && register
const INVALID_PASSWORD = "INVALID_PASSWORD"; // check on valid username

const DUPLICATED_USERNAME = "DUPLICATED_EMAIL";
const DATABASE_ERROR = ["QUERY_ERROR", "INSERTION_ERROR"];
const HASH_ERROR = "HASH_ERROR";

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  db.query(`SELECT * from staff where email = ?`, [email], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // Check whether email is in database
      console.log(result);
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            // Grab the user's id on the db
            const id = result[0].id;

            // Create a session and place the id into it
            req.session.userID = id;

            req.session.userName = result[0].name;

            req.session.userType = result[0].type;

            res.json({ login_status: true, result: id });

            // prompt user to next page

            console.log(`${email} logged in!`);
          } else {
            // Invalid Password
            res.json({ login_status: false, reason: INVALID_PASSWORD });
            // prompt user to re-enter the password
          }
        });
      } else {
        res.json({ login_status: false, reason: INVALID_USERNAME });
        // prompt user to register
      }
    }
  });
});

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const getStaffName = (email) => {
  return new Promise((resolve, reject) => {
    var query_string = "SELECT name from staff where email = ?";
    var query_var = [email];

    db.query(query_string, query_var, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getStaff = (email) => {
  return new Promise((resolve, reject) => {
    var query_string = "SELECT * from staff where email = ?";
    var query_var = [email];

    db.query(query_string, query_var, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const insertStaff = (password, cluster, email, name, type) => {
  return new Promise((resolve, reject) => {
    var query_string =
      "INSERT INTO staff (password, cluster, email, name, type) VALUES (?,?,?,?,?)";
    var query_var = [password, cluster, email, name, type];

    db.query(query_string, query_var, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// Register POST Request
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const cluster = req.body.cluster;
  const type = req.body.type;

  getStaff(email)
    .then((result) => {
      console.log(result);
      console.log(result.length);
      if (result.length === 0) {
        console.log("No staff with email: " + email + " found");
        hashPassword(password)
          .then((hash) => {
            console.log(hash);
            insertStaff(hash, cluster, email, name, type)
              .then((result) => {
                res.send({ register_status: true });
                console.log("Register Success");
                //console.log("Row changes " + result)
              })
              .catch((err) => {
                console.log(err);
                res.send({ register_status: false, reason: DATABASE_ERROR[1] });
                console.log("Register fail");
              });
          })
          .catch((err) => {
            console.log(err);
            res.send({ register_status: false, reason: HASH_ERROR });
          });
      } else {
        res.send({ register_status: false, reason: DUPLICATED_USERNAME });
        // prompt user to re-enter username
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ register_status: false, reason: DATABASE_ERROR[0] });
    });
});

router.post("/resetpassword", (req, res) => {
  const email = req.body.email;
  // TODO: Extract service from email
  const service = "hotmail";
  getStaffName(email)
    .then((result) => {
      var name = result[0].name;
      sendMail(service, email, name);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/logout", redirectToLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.send({ logout_status: false });
    }
    res.clearCookie("SID");
    res.send({ logout_status: true });
    // prompt user to login
  });
});

module.exports = router;
